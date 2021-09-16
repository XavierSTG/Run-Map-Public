import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  getInfo() {
    return this.http.get('assets/smalles_map.pypgr', {responseType: 'text'});
  }
}
