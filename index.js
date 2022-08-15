import app from './server.js'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import QuizDAO from './dao/quizDAO.js'

dotenv.config()
const port = process.env.PORT || 5000
const db_uri = process.env.DB_URI

MongoClient.connect(db_uri, async (err, client) => {
  if (err) throw err
  await QuizDAO.injectDB(client)
  app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  })
})