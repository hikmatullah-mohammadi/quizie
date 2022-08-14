import express from 'express'
import cors from 'cors'
import quiz from './api/quiz.router.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/v1/quizie', quiz)
app.use('*', (req, res) => res.status(404).json({ error: "Not found" }))

export default app