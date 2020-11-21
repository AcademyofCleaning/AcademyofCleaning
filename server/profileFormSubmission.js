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
  const text = 'INSERT INTO cleaner_profile(first_name, last_name, contact_num, email, has_tools) VALUES($1, $2, $3, $4, $5) RETURNING *'
  const values = [body.firstName, body.lastName, body.number, body.email, body.toolPic];

    const result = await pool.query(text, values);

    let profileId = result.rows[0].profile_id;
    let govId = body.govId;
    let toolPic = body.toolPic;
    s3Urls[0] = govId == true ? s3.getSignedUrl('putObject', s3Params(LICENSE_BUCKET, "licenses", profileId)) : '';
    s3Urls[1] = toolPic == true ? s3.getSignedUrl('putObject', s3Params(TOOLS_BUCKET, "tool pics", profileId)): '';

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
