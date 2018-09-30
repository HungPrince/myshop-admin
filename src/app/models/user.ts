export class User {
  FullName: string;
  UserName: string;
  Email: string;
  Token: string;
  Avatar: string;
  Permissions: any;
  Roles: any;

  public constructor(fullname: string, username: string, email: string, token: string, avatar: string, permissions: any, roles: any ) {
    this.FullName = fullname;
    this.UserName = username;
    this.Email = email;
    this.Token = token;
    this.Avatar = avatar;
    this.Permissions = permissions;
    this.Roles = roles;
  }
}
