export interface IUser {
  id?: number,
  email: string,
  password: string,
  role: string
}

export interface IUserError {
  isError: boolean,
  message: string,
}

export interface IToken extends IUserError {
  token?: string,
}
