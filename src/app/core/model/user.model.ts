export interface ILoginRequest {
  email: string | null,
  password: string | null;
}

export interface ILoginResponse {
  id: string,
  email: string,
  password: string;
}

export interface IRegisterRequest {
  nom: string,
  prenom: string,
  email: string,
  password: string;
}

export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  password?: string;
}