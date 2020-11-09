const { Pool } = require('pg');
const { allowedNodeEnvironmentFlags } = require('process');
const pool = new Pool({ 
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port,
});


module.exports.profileInsertion = async (event, callback )=> {
    const body = JSON.parse(event.body);
    const text = 'INSERT INTO cleaner_profile(first_name, last_name, contact_num) VALUES($1, $2, $3) RETURNING *'
    const values = [body.firstName, body.lastName, body.number]

    const result = await pool.query(text, values);
    pool.end();

    return {
      statusCode: 200,
      headers:{
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Methods" : "POST",
        "Access-Control-Allow-Origin" : "http://localhost:3000" 
      },
      body: JSON.stringify(
        {
          result: result.rows[0].profile_id
        },
        null,
        2
      ),
    };
  };
