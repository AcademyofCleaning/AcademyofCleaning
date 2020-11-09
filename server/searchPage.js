const { Pool, Client } = require('pg')

const pool = new Pool({
	user: process.env.user,
	host: process.env.host,
 	database: process.env.database,
  	password: process.env.password,
  	port: process.env.port,
})


module.exports.applySearch = async event => {
		const selectAllCleaners = "SELECT a.profile_id, a.first_name, a.last_name, a.contact_num, a.contact_ext, c.cert_name, e.attach_name, g.user_type, g.is_verified, g.email FROM cleaner_profile AS a LEFT JOIN completed_cert AS b ON a.profile_id = b.profile_id LEFT JOIN certification AS c ON b.cert_id = c.cert_id LEFT JOIN uploaded_attach AS d ON a.profile_id = d.profile_id LEFT JOIN attachment AS e ON e.attach_id = d.attach_id LEFT JOIN has_profile AS f ON f.profile_id = a.profile_id LEFT JOIN \"user\" AS g ON f.user_id = g.user_id;"

	const result = await pool.query(selectAllCleaners)

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
					"Access-Control-Allow-Origin": "http://localhost:3001",

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