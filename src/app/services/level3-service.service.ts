import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Level3} from '../models/level3';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Level3ServiceService {

  constructor(private http: HttpClient) {
  }

  getAllLevel3s(): Observable<Level3[]> {
    return this.http.get<Level3[]>(`${environment.BASE_URL}/level3`);
  }

  getLevel3ById(id: number): Observable<Level3> {
    return this.http.get<Level3>(`${environment.BASE_URL}/level3/${id}`);
  }

  createLevel3(data: Level3): Observable<Level3> {
    return this.http.post<Level3>(`${environment.BASE_URL}/level3`, data);
  }
}
