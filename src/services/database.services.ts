import { Collection, Db, MongoClient } from 'mongodb'
import 'dotenv/config'
import User from '~/models/schemas/User.schemas'

class Database {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(process.env.DB_URI as string)
    this.db = this.client.db(process.env.DB_NAME as string)
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Successfully connected to MongoDB!')
    } catch (error: any) {
      throw new Error(error)
    }
  }

  users(): Collection<User> {
    return this.db.collection('users')
  }
}

export default new Database()
