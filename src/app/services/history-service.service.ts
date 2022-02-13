import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {History, AddHistory} from '../models/history';
import {Device} from '../models/device';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryServiceService {

  constructor(private http: HttpClient) {
  }

  getAllHistories(): Observable<History[]> {
    return this.http.get<History[]>(`${environment.BASE_URL}/history`);
  }

  getHistoryById(id: number): Observable<History> {
    return this.http.get<History>(`${environment.BASE_URL}/history/${id}`);
  }

  createHistory(data: AddHistory): Observable<[History, Device]> {
    return this.http.post<[History, Device]>(`${environment.BASE_URL}/history`, data);
  }
}
