export interface ILoginRequest{
  email : string | null,
  password : string | null;
}

export interface ILoginResponse{
  id : string,
  email : string,
  password : string;
}

export interface IRegisterRequest{
  username? : string,
  email : string,
  password : string;
}

export interface User {
  id: string;
  username: string;
  email: string;
}