const { Pool } = require('pg');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();


const pool = new Pool({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port,
});

s3.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: process.env.region,
});

//TODO: change the actual PRIVATE_BUCKET name, for whatever reason AWS wasn't working properly and I couldn't change it
const LICENSE_BUCKET = "cleaner-licenses";
const TOOLS_BUCKET = "semi-private";

let s3Urls = ['',''];

const s3Params = (bucket_name, documentType, profileId) => {
    return {
        ACL: 'public-read',
        Bucket: bucket_name,
        ContentType: 'application/pdf',
        Key: `${documentType}/${profileId}.pdf`,
    }
 }

module.exports.saveProfile = async (event, callback )=> {
  const body = JSON.parse(event.body);
  console.log(body)
  const cleanerStatement = 'INSERT INTO cleaner_profile(first_name, middle_name, last_name, address, city, postal_code, province, dob, current_occup, contact_num, email, has_tools) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *'
  const cleanerValues = [body.firstName, body.middleName, body.lastName, body.address, body.city, body.postal, body.province, body.dob, body.currentOccupation, body.number, body.email, body.toolPic];
  const result = await pool.query(cleanerStatement, cleanerValues);

  let profileId = result.rows[0].profile_id;

  const refInsertStatement = 'INSERT INTO reference(first_name, last_name, email, contact_num, relationship) VALUES ($1, $2, $3, $4, $5) RETURNING ref_id'
  const hasRefInsertStatement = 'INSERT INTO has_ref(profile_id, ref_id) VALUES ($1, $2)'
  if (body.reference1Name) {
    console.log("in ref 1 block")
    let name = body.reference1Name.split(" ")
    const ref1Values = [name[0], name[1], body.reference1Email, "647-781-1815", body.reference1Relationship]
    const ref1Result = await pool.query(refInsertStatement, ref1Values) 
    let ref1Id = ref1Result.rows[0].ref_id
    await pool.query(hasRefInsertStatement, [profileId, ref1Id])
    .catch(err => console.log(err))
  }

  if (body.reference2Name) {
    console.log("in ref 2 block")
    let name = body.reference2Name.split(" ")
    const ref2Values = [name[0], name[1], body.reference2Email, "905-334-1458", body.reference2Relationship]
    const ref2Result = await pool.query(refInsertStatement, ref2Values) 
    let ref2Id = ref2Result.rows[0].ref_id
    await pool.query(hasRefInsertStatement, [profileId, ref2Id])
    .catch(err => console.log(err))
  }
  
  // insert into references, return refernce id, put refid and profile_id into has reference

  let govId = body.govId;
  let toolPic = body.toolPic;
    //let hin = body.hin

    s3Urls[0] = govId == true ? s3.getSignedUrl('putObject', s3Params(LICENSE_BUCKET, "licenses", profileId)) : '';
    s3Urls[1] = toolPic == true ? s3.getSignedUrl('putObject', s3Params(TOOLS_BUCKET, "tool pics", profileId)): '';
    /* To implement HIN, just uncomment the below line */
    //s3Urls[2] = hin == true ? s3.getSignedUrl('putObject', s3Params(TOOLS_BUCKET, "tool pics", profileId)): '';

    return {
      statusCode: 200,
      headers:{
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Methods" : "POST",
        "Access-Control-Allow-Origin" : "*"
      },
      body: JSON.stringify(
        {
          result: profileId,
          govIdUrl: s3Urls[0],
          toolPicUrl: s3Urls[1]
        },
        null,
        2
      ),
    };
  };
