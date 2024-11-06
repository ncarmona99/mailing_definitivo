import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private apiUrl = 'http://localhost:3000/campaign'; // URL de la API de Node.js

  constructor(private http: HttpClient) {}

  sendCampaign(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/send`, data); // Endpoint para enviar campañas
  }

  getAnalytics(campaignId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/analytics/${campaignId}`); // Endpoint para obtener analíticas
  }

  getNoDisturbList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/no-disturb-list`); // Endpoint para la lista de "no molestar"
  }
}