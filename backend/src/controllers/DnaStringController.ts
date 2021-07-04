import dbConfig from 'db';
import { Application, Request, Response } from 'express';
import { Pool } from 'pg'

class DnaStringController {

    public async get(req: Request, res: Response) {
        try {
            const pool: Pool = dbConfig.pool;
            const client = await pool.connect();

            const sql = "SELECT content FROM DNA_STRING";
            const { rows } = await client.query(sql);
            const todos = rows;

            client.release();

            res.send(todos);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async getWithSearchDistance(req: Request, res: Response) {
        try {
            const searchString = req.query['searchParam'];
            const searchDistance = req.query['distance'];
            const pool: Pool = dbConfig.pool;
            const client = await pool.connect();

            const sql = `SELECT content FROM DNA_STRING where levenshtein('${searchString}', content) <= ${searchDistance}`;
            const { rows } = await client.query(sql);
            const todos = rows;

            client.release();

            res.send(todos);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async post(req: Request, res: Response) {
        try {
            const dnaStringContent = req.body['content'];
            const pool: Pool = dbConfig.pool;
            const client = await pool.connect();

            const { rows } = await client.query("INSERT INTO DNA_STRING(content) values($1)", [dnaStringContent]);
            const todos = rows;

            client.release();

            res.send(todos);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default DnaStringController;