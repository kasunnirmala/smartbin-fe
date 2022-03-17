import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Device} from '../models/device';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceServiceService {

  constructor(private http: HttpClient) {
  }

  getAllDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(`${environment.BASE_URL}/device`);
  }

  getDeviceById(id: number): Observable<Device> {
    return this.http.get<Device>(`${environment.BASE_URL}/device/${id}`);
  }

  createDevice(data: Device): Observable<Device> {
    console.log(data)
    return this.http.post<Device>(`${environment.BASE_URL}/device`, data);
  }

  deleteDevice(id: number): Observable<Device> {
    return this.http.delete<Device>(`${environment.BASE_URL}/device/${id}`);
  }

  updateDevice(data: Device): Observable<Device> {
    return this.http.post<Device>(`${environment.BASE_URL}/device/edit/`, data);
  }
}
