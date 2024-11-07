import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private emailApiUrl = 'http://localhost:3002'; // Cambia al puerto de tu API de correos
  private smsApiUrl = 'http://localhost:3000';   // Cambia al puerto de tu API de Twilio SMS
  private noDisturbApiUrl = 'http://localhost:3001'; // Cambia al puerto de tu API de "no molestar"

  constructor(private http: HttpClient) {}

  // Enviar campaña de correo
  sendEmailCampaign(payload: { message: string, recipients: string[] }): Observable<any> {
    return this.http.post(`${this.emailApiUrl}/send-email`, payload);
  }

  // Enviar campaña de SMS
  sendSmsCampaign(payload: { message: string, recipients: string[] }): Observable<any> {
    return this.http.post(`${this.smsApiUrl}/send-sms`, payload);
  }

  // Obtener la lista de "no molestar"
  getNoDisturbList(): Observable<string[]> {
    return this.http.get<string[]>(`${this.noDisturbApiUrl}/no-disturb-list`);
  }
}