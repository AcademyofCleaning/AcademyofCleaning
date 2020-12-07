const { Pool, Client } = require('pg')

const pool = new Pool({
	user: process.env.user,
	host: process.env.host,
 	database: process.env.database,
  	password: process.env.password,
	port: process.env.port,
})


module.exports.applySearch = async event => {
		/* @Gurleen: This is a SELECT statement to help with the filter story
					Since we're refining filters now, removing LEFT JOIN to improve performance. 
					This also solves the problem of a single cleaner showing up multiple times on the results page
					WHERE statement ensures applications that are not ready for employers to view (Saved not Submitted) aren't viewable on Search page.*/
		// const selectAllCleaners = "SELECT a.profile_id, a.first_name,	a.middle_name, a.last_name,	a.contact_num, a.app_status, a.email, a.address, a.city, a.province, a.postal_code,	a.hin, a.dob, a.current_occup, a.gov_id FROM cleaner_profile AS a WHERE app_status != 'Began Application';"
		const selectAllCleaners = "SELECT b.profile_id, b.first_name,	b.middle_name, b.last_name,	b.contact_num, b.app_status, b.email, b.address, b.city, b.province, b.postal_code,	b.hin, b.dob, b.current_occup, b.gov_id, d.cert_name, f.is_complete, g.relationship FROM cleaner_profile AS b LEFT JOIN enrolled AS f ON f.profile_id = b.profile_id LEFT JOIN certification AS d ON d.cert_id = f.cert_id LEFT JOIN has_ref AS e ON e.profile_id = b.profile_id LEFT JOIN reference AS g ON g.ref_id = e.ref_id"

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
