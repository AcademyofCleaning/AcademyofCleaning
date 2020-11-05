const { Pool, Client } = require('pg')
const pool = new Pool({
    user: 'Administrator',
    host: 'aoc-db-dev.cjynw6x3q1ly.us-west-1.rds.amazonaws.com',
    database: 'aoc-db-dev',
    password: 'DBAoC_1234',
    port: 5432,
})
pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
})
const client = new Client({
    user: 'Administrator',
    host: 'aoc-db-dev.cjynw6x3q1ly.us-west-1.rds.amazonaws.com',
    database: 'aoc-db-dev',
    password: 'DBAoC_1234',
    port: 5432,
})
client.connect()
client.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    client.end()
})
