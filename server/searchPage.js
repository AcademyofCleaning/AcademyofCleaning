const { Pool, Client } = require('pg')

const pool = new Pool({
	// !!!
	user: 'master',
	host: 'aoc-db-dev.cjynw6x3q1ly.us-west-1.rds.amazonaws.com',
	database: 'aocdb',
	password: 'msci3422020',
	port: 5432,
	// idleTimeoutMillis: 30000,
	// connectionTimeoutMillis: 2000,
})


module.exports.applySearch = async event => {

	const selectAllCleaners = "SELECT * FROM cleaner_profile AS a\
	LEFT JOIN completed_cert AS b ON a.profile_id = b.profile_id\
	LEFT JOIN certification AS c ON b.cert_id = c.cert_id\
	LEFT JOIN uploaded_attach AS d ON a.profile_id = d.profile_id\
	LEFT JOIN attachment AS e ON e.attach_id = d.attach_id\
	WHERE cleaner_profile.profile_id = '1'";

	const result = await pool.query(selectAllCleaners)

// CHECK FOR ERROR
	if(!result){
		return {
			statusCode: 400,
		}
	}

	return {
			statusCode: 200,
			headers:{
					"Access-Control-Allow-Headers" : "Content-Type",
					"Access-Control-Allow-Methods": "GET",
					"Access-Control-Allow-Origin": "http://localhost:3000",
			},
			body: JSON.stringify(
			{
				result: result.rows,
			},
			null,
			2
			),
	};
};