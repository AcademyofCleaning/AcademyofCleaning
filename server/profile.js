const { Pool, Client } = require('pg')

const pool = new Pool({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port,
});

// Application States
const READY_FOR_VEFIFICATION = 'Application Pending Employer Validation';
const VERIFIED = 'Application Completed Employer Validation';

module.exports.getProfile = async (event) => {

  let profileId = Number(event.queryStringParameters.id);
  let verifiedState = Number(event.queryStringParameters.verified);

  /**
   * Update the application state based on the type of call
   */
  let stateUpdate = "";
  const appStatusUpdateSQL = 'UPDATE cleaner_profile SET app_status = $1 WHERE profile_id = $2';
  if(verifiedState == 0){
    const readyToVerifyValues = [READY_FOR_VEFIFICATION, profileId]
    stateUpdate = await pool.query(appStatusUpdateSQL, readyToVerifyValues);
  } 
  if(verifiedState == 1){
    const inProgressValues = [VERIFIED, profileId]
    stateUpdate = await pool.query(appStatusUpdateSQL, inProgressValues);
  }

  const selectProfile = "SELECT * FROM cleaner_profile WHERE profile_id = $1";
  const values = [profileId]

  const result = await pool.query(selectProfile, values);

  if(result.rowCount !=1) {
    return {
      statusCode: 400,
    }
  }

  return {
      statusCode: 200,
      headers:{
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(
      {
        result: result.rows[0],
      },
      null,
      2
      ),
  };
};
