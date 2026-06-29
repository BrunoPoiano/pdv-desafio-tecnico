import { readFile } from 'fs/promises'
import path from 'path'
import { Pool } from 'pg'

const config = {
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD
}

export const pool = new Pool(config)

export async function connectDatabase() {
	try {
		const client = await pool.connect()

		const result = await client.query('SELECT NOW()')
		console.log('Connected to PostgreSQL')
		console.log(result.rows[0])

		client.release()
	} catch (err) {
		console.error('Database connection failed:', err)
		process.exit(1)
	}
}

export async function runMigrations() {
	const client = await pool.connect()

	try {
		const sqlPath = path.join(process.cwd(), 'src/database', 'database.sql')
		const sql = await readFile(sqlPath, 'utf8')

		await client.query(sql)

		console.log('SQL executed successfully.')
	} finally {
		client.release()
	}
}
