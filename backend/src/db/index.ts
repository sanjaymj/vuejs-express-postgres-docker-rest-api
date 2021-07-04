import { Request, Response } from 'express'
import path from 'path'
import { Pool } from 'pg'
import { migrate } from 'postgres-migrations'

const poolConfig = {
	database: process.env.DATABASE,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	max: Number(process.env.DB_POOL_SIZE),
	idleTimeoutMillis: Number(process.env.DB_POOL_CLIENT_IDLE_TIMEOUT),
	connectionTimeoutMillis: Number(
		process.env.DB_POOL_CLIENT_CONNECTION_TIMEOUT
	),
}

class DatabaseConfig {
	private _pool: Pool;

	constructor() {
		this._pool = new Pool(poolConfig);
	}

	public async runMigrations(): Promise<void> {
		const client = await this._pool.connect();
		try {
			await migrate({ client }, path.resolve(__dirname, 'migrations/sql'));
		} catch (error) {
			console.error('migration failed', error);
		} finally {
			client.release()
		}
	}

	public get pool() {
		return this._pool;
	}
}

const dbConfig = new DatabaseConfig()

export default dbConfig;
