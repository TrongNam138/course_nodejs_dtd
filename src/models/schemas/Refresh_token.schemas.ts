export default class Refresh_token {
  user_id: string
  token: string
  created_at: Date

  constructor({ user_id, token }: { user_id: string; token: string }) {
    this.user_id = user_id
    this.token = token
    this.created_at = new Date()
  }
}
