const { Pool, Client } = require('pg')

const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
});

module.exports.getProfile = async (event) => {

  let profileId = Number(event.queryStringParameters.id);

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
