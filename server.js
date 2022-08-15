import express from 'express'
import cors from 'cors'
import quiz from './api/quiz.router.js'

const app = express()

app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}

app.use('/api/v1/quizie', quiz)
app.use('*', (req, res) => res.status(404).json({ error: "Not found" }))

export default app