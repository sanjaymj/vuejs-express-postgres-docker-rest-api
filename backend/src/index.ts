import TodosController from 'controllers/DnaStringController';
import express, { Request, Response } from 'express'
import dbConfig from './db';
import dnaStringRouter from './routers/DnaStringRouter';
import cors from 'cors';
const PORT = process.env.PORT || 3000

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use('/v0/api/dna-strings', dnaStringRouter);

app.listen(PORT, () => {
  console.log(`Started app on ${PORT}`);
  dbConfig.runMigrations();
})
