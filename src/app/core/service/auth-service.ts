import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.development';
import {ILoginResponse, IRegisterRequest} from '../model/user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http : HttpClient = inject(HttpClient);
  private readonly jsonServerApi : string = environment.jsonServer

  userRegister(userRegistrationData : IRegisterRequest) : Observable<ILoginResponse>{
    return this.http.post<IRegisterRequest>(`${this.jsonServerApi}/users`,userRegistrationData)
  }

}
