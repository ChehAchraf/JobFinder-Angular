import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ILoginRequest, ILoginResponse, IRegisterRequest, User } from '../model/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly jsonServerApi: string = environment.jsonServer

  userRegister(userRegistrationData: IRegisterRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.jsonServerApi}/users`, userRegistrationData)
  }

  userLogin(userLoginData: ILoginRequest): Observable<User[]> {
    return this.http.get<User[]>(`${this.jsonServerApi}/users?email=${userLoginData.email}&password=${userLoginData.password}`);
  }

  updateProfile(id: string, data: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.jsonServerApi}/users/${id}`, data);
  }

  deleteAccount(id: string): Observable<void> {
    return this.http.delete<void>(`${this.jsonServerApi}/users/${id}`);
  }
}
