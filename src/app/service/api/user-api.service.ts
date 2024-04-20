import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../model/user.model';


import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAPI {

  private baseUrl = 'http://localhost:8080/api';
  private token: string;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('accessToken');
  }

  // Saving user details
  saveUserDetails(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.baseUrl}/users`, data, { headers });
  }

  // Update user details
  updateUserDetails(data: any, userId: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.put(`${this.baseUrl}/users/${userId}`, data, { headers });
  }

  // Get single user
  getUserDetails(userId: string): Observable<any> {
    let test_token: String;
    //test_token  = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImJhNjI1OTZmNTJmNTJlZDQ0MDQ5Mzk2YmU3ZGYzNGQyYzY0ZjQ1M2UiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGVzdC1hcHAtMTMzZDAiLCJhdWQiOiJ0ZXN0LWFwcC0xMzNkMCIsImF1dGhfdGltZSI6MTcxMTc1Nzc0MywidXNlcl9pZCI6InBqQXpYenhoTmJVcU5JbnVkYzVydGdUZzBCMDMiLCJzdWIiOiJwakF6WHp4aE5iVXFOSW51ZGM1cnRnVGcwQjAzIiwiaWF0IjoxNzExNzU3NzQzLCJleHAiOjE3MTE3NjEzNDMsImVtYWlsIjoiZHd0Lmtyc0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZHd0Lmtyc0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.JgKSvlOCsSN1JmlQdaK-IMNJuKLnYcSR4DxF387EGYXi26tFx8KHu5QU1dXkfn1nSbip4cjlH8QR3FTOUfcivjvyaW7IcLrHzY_7noZAxCnOrwpBHe6X3wzIybSBn0oowK9M61c8_TSvC_KwTr51QRHoZuE8WhgLoX0rBNCrym41bua1_M5we-3mfSuPu3zvRnTz_Bq5tt9MW9WFKnAsQIwgN44Ts-v72TG7iZNt667f2sSn_GdreeG6trtEHL98fSubbskyHTRxY6_16uh6TBUICYqiPHia36a1nBDZyUkEm6EXXNAN0fHSXBnVx-TwSoK4iv_hklnBq9RUoK43nQ';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    console.log(`${this.baseUrl}/users/${userId}`)
    return this.http.get<any>(`${this.baseUrl}/users/${userId}`, { headers });
  }

  // Get all users
  getAllUsers(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any>(`${this.baseUrl}/users`);
  }

  getAllUsersByEmail(email: string, token: string): Observable<User[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let params = new HttpParams();
    if (email) {
      params = params.set('email', email);
    }
    return this.http.get<any>(`${this.baseUrl}/users`, { headers, params }).pipe(
      map(response => {
        // API response contains a property named 'data' which holds the users array
        return response.data as User[];
      })
    );
  }

  // save user experience
  saveExperience(data: any, userId: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.baseUrl}/experiences?userId=${userId}`, data, { headers });
  }

  updateExperience(experienceId: string, data: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.put(`${this.baseUrl}/experiences/${experienceId}`, data, { headers });
  }

  // delete user experience
  deleteExperience(experienceId: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.delete(`${this.baseUrl}/experiences/${experienceId}`, { headers });
  }

  // save user education
  saveEducation(data: any, userId: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.baseUrl}/education?userId=${userId}`, data, { headers });
  }

  updateEducation(educationId: string, data: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.put(`${this.baseUrl}/education/${educationId}`, data, { headers });
  }

  // delete user education
  deleteEducation(educationId: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.delete(`${this.baseUrl}/education/${educationId}`, { headers });
  }

  // save user projects
  saveProjects(data: any, userId: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.baseUrl}/projects?userId=${userId}`, data, { headers });
  }

  updateProject(projectId: string, updatedData: any): Observable<any> {
    const url = `${this.baseUrl}/projects/${projectId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.put(url, updatedData, { headers });
  }

  // delete user experience
  deleteProject(projectId: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.delete(`${this.baseUrl}/projects/${projectId}`, { headers });
  }

  // save user skills
  saveSkills(data: any, userId: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.baseUrl}/skills?userId=${userId}`, data, { headers });
  }

  updateSkill(skillId: string, data: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.put(`${this.baseUrl}/skills/${skillId}`, data, { headers });
  }

  // delete user experience
  deleteSkill(skillId: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.delete(`${this.baseUrl}/skills/${skillId}`, { headers });
  }

  // save user certifications
  saveCertifications(data: any, userId: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.baseUrl}/certifications?userId=${userId}`, data, { headers });
  }

  // Update certification details
  updateCertification(certificationId: string, data: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.put(`${this.baseUrl}/certifications/${certificationId}`, data, { headers });
  }

  // delete user experience
  deleteCertification(certificationId: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.delete(`${this.baseUrl}/certifications/${certificationId}`, { headers });
  }

  //generate experience responsibilities
  generateResponsibilities(requestBody: any, userId: string): Observable<any> {
    // const apiUrl = 'http://localhost:8080/api/openai/chat/experiences/65e505389eb0d0350c385d1b';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.baseUrl}/openai/chat/experiences/${userId}`, requestBody, { headers }).pipe(
      map((response: any) => response.data.map((item: any) =>// item.responsibility
        console.log(item)
      )),
      catchError((error: any) => throwError(error))
    );
  }

  
  generateResponsibilities2(requestBody: any): Observable<any> {     
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.baseUrl}/openai/chat/experiences`, requestBody, { headers });
  }
  generateProjectDescription(requestBody: any): Observable<any> {     
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.baseUrl}/openai/chat/projects`, requestBody, { headers });
  }

  generateProfessionalSummary(requestBody: any, email: string): Observable<any> {    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.baseUrl}/openai/chat/professionalSummary`, requestBody, { headers });
  }

  generateResume(requestBody: any, email: string): Observable<any> {    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.baseUrl}/openai/chat/${email}`, requestBody, { headers });
  }
  generateCoverLetter(requestBody: any, email: string): Observable<any> {    
   
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.baseUrl}/openai/chat/cover-letter/${email}`, requestBody, { headers });
  }
}


// so this is my experience.html you need to fetch the experienceId frm the api and pass the experienceId on the updateExperience that we just created but we a
