const { Pool } = require('pg');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

//DB connection Information 
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
// AWS bucket names
const LICENSE_BUCKET = "cleaner-licenses";
const TOOLS_BUCKET = "semi-private";
let s3Urls = ['',''];

//Application Status Names:
const IN_PROGRESS = 'Began Application';
const READY_FOR_VEFIFICATION = 'Application Pending Employer Validation';

/** Build out the s3 bucket URL */
const s3Params = (bucket_name, documentType, profileId) => {
    return {
        ACL: 'public-read',
        Bucket: bucket_name,
        ContentType: 'application/pdf',
        Key: `${documentType}/${profileId}.pdf`,
    }
}

module.exports.editProfile = async (event, callback )=> {
    const responseBody = JSON.parse(event.body);

    /**
     * Update the profile 
     */
    const sqlProfileUpdate = 'UPDATE cleaner_profile SET(first_name, last_name, contact_num, email, has_tools) = ($1, $2, $3, $4, $5) WHERE profile_id = $6'
    const dbValuesToBeUpdated = [responseBody.firstName, responseBody.lastName, responseBody.number, responseBody.email, responseBody.toolPic, responseBody.id]
    const result = await pool.query(sqlProfileUpdate, dbValuesToBeUpdated);

    /**
     * Update the application state based on the type of call if param is included
     */
    let stateUpdate = "";
    const appStatusUpdateSQL = 'UPDATE cleaner_profile SET app_status = $1 WHERE profile_id = $2';
    if(responseBody.readyForVerification == 1){
      const readyToVerifyValues = [READY_FOR_VEFIFICATION, responseBody.id]
      stateUpdate = await pool.query(appStatusUpdateSQL, readyToVerifyValues);
    } 
    if(responseBody.readyForVerification == 0){
      const inProgressValues = [IN_PROGRESS, responseBody.id]
      stateUpdate = await pool.query(appStatusUpdateSQL, inProgressValues);
    }

    /**
     * Update the files 
     */
    let profileId = responseBody.id;
    let govId = responseBody.govId;
    let toolPic = responseBody.toolPic;
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
