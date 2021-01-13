/**
 * アカウントに紐づく情報のモデル.
 */

export class Account {
  id: string
  token: string

  constructor(id: string, token: string) {
    this.id = id;
    this.token = token;
  }
}
