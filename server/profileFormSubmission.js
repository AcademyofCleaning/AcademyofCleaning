const { Pool } = require('pg');
const { allowedNodeEnvironmentFlags } = require('process');
// const { getMaxListeners } = require('process');
const pool = new Pool({ // REMEMBER TO CHANGE TO prov.env.variable BEFORE pushing to a branch! 
    // user: process.env.user,
    // host: process.env.host,
    // database: process.env.database,
    // password: process.env.password,
    // port: process.env.port,
    user: 'master',
    host: 'aoc-db-dev.cjynw6x3q1ly.us-west-1.rds.amazonaws.com',
    database: 'aocdb',
    password: 'msci3422020',
    port: 5432,
});

//do I need to connect and close connection to pool here?

module.exports.profileInsertion = async (event, callback )=> {
    const body = JSON.parse(event.body);
    const text = 'INSERT INTO cleaner_profile(first_name, last_name, contact_num) VALUES($1, $2, $3) RETURNING *'
    //form asks for only full name vs DB has first name, last name
    const values = [body.firstName, body.lastName, body.number]

    const result = await pool.query(text, values);
    pool.end();

    return {
      statusCode: 200,
      headers:{
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Methods" : "POST",
        "Access-Control-Allow-Origin" : "*" //REMEMBER to to cange to localhost
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
