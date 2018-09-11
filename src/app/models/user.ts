export class User {
  userName: string;
  email: string;
  token: string;
  avatar: string;

  public constructor(username: string, email: string, token: string, avatar: string) {
    this.userName = username;
    this.email = email;
    this.token = token;
    this.avatar = avatar;
  }
}
