const { Pool, Client } = require('pg')

const pool = new Pool({
	user: process.env.user,
	host: process.env.host,
 	database: process.env.database,
  	password: process.env.password,
	port: process.env.port,
})


module.exports.applySearch = async event => {
		// const selectAllCleaners = "SELECT * FROM cleaner_profile"
		const selectAllCleaners = "SELECT b.profile_id, b.first_name,	b.middle_name, b.last_name,	b.contact_num, b.app_status, b.email, b.address, b.city, b.province, b.postal_code,	b.hin, b.dob, b.current_occup, b.gov_id, d.cert_name, f.is_complete, g.relationship FROM cleaner_profile AS b LEFT JOIN enrolled AS f ON f.profile_id = b.profile_id LEFT JOIN certification AS d ON d.cert_id = f.cert_id LEFT JOIN has_ref AS e ON e.profile_id = b.profile_id LEFT JOIN reference AS g ON g.ref_id = e.ref_id"
		// const selectAllCleaners = "SELECT a.profile_id, a.first_name, a.last_name, a.contact_num, a.contact_ext, c.cert_name, e.attach_name, g.user_type, g.is_verified, g.email FROM cleaner_profile AS a LEFT JOIN enrolled AS b ON a.profile_id = b.profile_id LEFT JOIN certification AS c ON b.cert_id = c.cert_id LEFT JOIN uploaded_attach AS d ON a.profile_id = d.profile_id LEFT JOIN attachment AS e ON e.attach_id = d.attach_id LEFT JOIN has_profile AS f ON f.profile_id = a.profile_id LEFT JOIN \"user\" AS g ON f.user_id = g.user_id;"

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
					"Access-Control-Allow-Origin": "*",
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
