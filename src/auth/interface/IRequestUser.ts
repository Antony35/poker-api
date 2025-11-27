export type SessionRequest = Request & { user: IUserRequest }

export interface IUserRequest {
  "username": string;
  "iat": number;
  "exp": number;
}