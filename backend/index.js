import app from './server.js'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import usersDAO from './dao/usersDAO.js'

dotenv.config()
const port = process.env.PORT
const db_uri = process.env.DB_URI

MongoClient.connect(db_uri, async (err, client) => {
  if (err) throw err
  await usersDAO.injectDB(client)
  app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  })
})