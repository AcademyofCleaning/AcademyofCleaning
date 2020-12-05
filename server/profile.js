const { Pool, Client } = require('pg')

const pool = new Pool({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port,
    // user: 'master',
    // host: 'aoc-db-dev.cjynw6x3q1ly.us-west-1.rds.amazonaws.com',
    // database: 'aocdb',
    // password: 'msci3422020',
    // port: 5432,

});

// Application States
const READY_FOR_VEFIFICATION = 'More Info Required';
const VERIFIED = 'Completed Validation';

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

  const selectRefs = "SELECT * FROM has_ref LEFT JOIN reference ON has_ref.ref_id = reference.ref_id WHERE has_ref.profile_id = $1";
  const values2 = [profileId]

  const resultRefs = await pool.query(selectRefs, values2);
  // console.log(resultRefs)


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
        resultRefs: resultRefs.rows,
      },
      null,
      2
      ),
  };
};
