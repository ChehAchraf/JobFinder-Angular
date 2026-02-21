import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Application } from '../model/application.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private http = inject(HttpClient);
  private apiUrl = environment.jsonServer;


  getUserApplications(userId: string) {
    return this.http.get<Application[]>(`${this.apiUrl}?userId=${userId}`);
  }

  addApplication(app: Application) {
    return this.http.post<Application>(this.apiUrl, app);
  }

  updateApplication(id: string, changes: Partial<Application>) {
    return this.http.patch<Application>(`${this.apiUrl}/${id}`, changes);
  }

  deleteApplication(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  

  
}
