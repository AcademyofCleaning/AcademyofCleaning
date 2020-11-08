const { Pool } = require('pg')
const client = new Client({
    user: 'master',
    host: 'aoc-db-dev.cjynw6x3q1ly.us-west-1.rds.amazonaws.com',
    database: 'aocdb',
    password: 'msci3422020',
    port: 5432,
});

//do I need to connect and close connection to pool here?

module.exports.profileInsertion = async event => {
    const text = 'INSERT INTO cleaner_profile(first_name, last_name, contact_num) VALUES($1, $2, $3, $4)'
    //form asks for only full name vs DB has first name, last name
    const values = [event.queryStringParameters.name, event.queryStringParameters.name, event.queryStringParameters.email, event.queryStringParameters.contactNum]

    const result = await pool.query(text, values);

    return {
      statusCode: 200,
      headers:{
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Methods" : "POST",
        "Access-Control-Allow-Origin" : "*"
      },
      body: JSON.stringify(
        {
          result: result.rows[0]
        },
        null,
        2
      ),
    };
  };
