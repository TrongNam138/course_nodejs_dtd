import express from 'express'
import database from './services/database.services'
import 'dotenv/config'

const app = express()

const HOST = process.env.SV_HOST as unknown as string
const PORT = process.env.SV_PORT as unknown as number

app.listen(PORT, HOST, async () => {
  await database.connect()
  console.log(`Server running at http://${HOST}:${PORT}/`)
})
