import TodosController from 'controllers/DnaStringController';
import express, { Request, Response } from 'express'
import dbConfig from './db';
import dnaStringRouter from './routers/DnaStringRouter';

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json());
app.use(express.urlencoded());

app.use('/v0/api/dna', dnaStringRouter);


app.listen(PORT, () => {
  console.log(`Started app on ${PORT}`);
  dbConfig.runMigrations();
})