import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private apiUrl = 'https://wsprmx.pointer.mx/webAPIPRM/api/FemsaTicketsApi/GetDriversApp';

  constructor(private http: HttpClient) { }

  // Método para obtener los datos del conductor
  getDriverData(driverId:string): Observable<any> {

    const url = `${this.apiUrl}?DriverId=${driverId}`;

    return this.http.get<any>(url);
  }
}
