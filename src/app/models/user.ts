export class User {
  FullName: string;
  UserName: string;
  Email: string;
  Token: string;
  Avatar: string;

  public constructor(fullname: string, username: string, email: string, token: string, avatar: string) {
    this.FullName = fullname;
    this.UserName = username;
    this.Email = email;
    this.Token = token;
    this.Avatar = avatar;
  }
}
