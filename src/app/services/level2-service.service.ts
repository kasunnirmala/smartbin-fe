import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Level2} from '../models/level2';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Level2ServiceService{

  constructor(private http: HttpClient) {}

  getAllLevel2s(): Observable<Level2[]> {
    return this.http.get<Level2[]>(`${environment.BASE_URL}/level2`);
  }

  getLevel2ById(id: number): Observable<Level2> {
    return this.http.get<Level2>(`${environment.BASE_URL}/level2/${id}`);
  }

  createLevel2(data: Level2): Observable<Level2> {
    return this.http.post<Level2>(`${environment.BASE_URL}/level2`, data);
  }
}
