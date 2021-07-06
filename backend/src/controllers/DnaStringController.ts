import dbConfig from 'db';
import { Application, Request, Response } from 'express';
import { Pool, PoolClient } from 'pg'

class DnaStringController {

    public async getAllStringsFromDB(req: Request, res: Response) {
        try {
            const pool: Pool = dbConfig.pool;
            const client = await pool.connect();

            const sql = "SELECT content FROM DNA_STRING";
            const { rows } = await client.query(sql);
            const dnaStrings = rows;

            client.release();

            res.send(dnaStrings);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async getStringsWithSearchDistance(req: Request, res: Response) {
        
        const searchString = req.query['searchParam'];
        const searchDistance = req.query['distance'] ? req.query['distance'] : 0;

        if (searchString === undefined) {
            res.status(422).send("search string cannot be null");
        } else {
            try {
                const pool: Pool = dbConfig.pool;
                const client = await pool.connect();

                const sql = `SELECT content FROM DNA_STRING where levenshtein('${searchString}', content) <= ${searchDistance}`;
                const { rows } = await client.query(sql);
                const dnaStrings = rows;
                client.release();
                
                res.send(dnaStrings);
            } catch (error) {
                res.status(400).send(error);
            }
        }
            
    } 

    public async addDnaStringToDatabase(req: Request, res: Response) {
        try {
            const dnaStringContent = req.body['content'];

            // validate dna strings before adding
            if (!!dnaStringContent && !DnaStringController.isDnaStringValid(dnaStringContent)) {
                res.status(400).send(`'${dnaStringContent}' is an invalid DnaString`);
            }
            const pool: Pool = dbConfig.pool;
            const client = await pool.connect();

            // check of the string already exists
            if (!DnaStringController.isStringAlreadyFoundInDatabase(dnaStringContent, client)) {
                client.release();
                res.status(400).send(`'${dnaStringContent}' already exists`);
            } else {
                const { rows } = await client.query("INSERT INTO DNA_STRING(content) values($1)", [dnaStringContent]);
                const dnaStrings = rows;

                client.release();

                res.send(dnaStrings);
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }

    private static async isStringAlreadyFoundInDatabase(dnaString: String, client: PoolClient): Promise<boolean> {
        const queryResult = await client.query(`SELECT count(*) FROM DNA_STRING WHERE content = '${dnaString}'`);
        if (!!queryResult && queryResult.rows && queryResult.rows.length) {
            return queryResult.rows[0]['count'] > 0;
        }
        return false;
    }

    private static isDnaStringValid(dnaString: String) {
        return dnaString.toUpperCase().match(/(?![ACTG])./g) == null;
    }
}

export default DnaStringController;