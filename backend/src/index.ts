import express, { Request, Response } from 'express'

const PORT = process.env.PORT || 3000

const app = express()

app.get('/', (req: Request, res: Response) => {
  res.send('in get request')
});

app.listen(PORT, () => {
  console.log(`Started app on ${PORT}`)
})