import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Level1} from '../models/level1';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Level1ServiceService {

  constructor(private http: HttpClient) {}

  getAllLevel1s(): Observable<Level1[]> {
    return this.http.get<Level1[]>(`${environment.BASE_URL}/level1`);
  }

  getLevel1ById(id: number): Observable<Level1> {
    return this.http.get<Level1>(`${environment.BASE_URL}/level1/${id}`);
  }

  createLevel1(data: Level1): Observable<Level1> {
    return this.http.post<Level1>(`${environment.BASE_URL}/level1`, data);
  }
}
