import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {}

  get(endpoint: string, payload?: any) {
    return this.http.get(endpoint, { params: payload });
  }

  post(endpoint: string, payload?: any) {
    return this.http.post(endpoint, payload);
  }

  put(endpoint: string, payload?: any) {
    return this.http.put(endpoint, payload);
  }

  delete(endpoint: string, payload?: any) {
    return this.http.delete(endpoint, payload);
  }

  postXML(endpoint: string, payload?: any) {
    return this.http.post(endpoint, payload, {responseType: 'text'});
  }

  postBlob(endpoint: string, payload?: any) {
    return this.http.post(endpoint, payload, {observe: 'response', responseType: 'blob'});
  }
}
