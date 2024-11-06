import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-campaign',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [CampaignService],
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {
  campaignData = {
    message: '',
    recipients: ''
  };
  analytics: any = null;
  noDisturbList: string[] = [];
  errorMessage: string | null = null;

  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {
    this.fetchNoDisturbList();
  }

  fetchNoDisturbList() {
    this.campaignService.getNoDisturbList().subscribe(
      data => this.noDisturbList = data,
      error => console.error('Error al obtener la lista de "no molestar":', error)
    );
  }

  sendCampaign() {
    // Convertir destinatarios a una lista de emails
    const recipientsList = this.campaignData.recipients.split(',').map(email => email.trim());

    const campaignPayload = {
      message: this.campaignData.message,
      recipients: recipientsList
    };

    this.campaignService.sendCampaign(campaignPayload).subscribe(
      response => {
        if (response.success) {
          alert('Campaña enviada con éxito');
          this.analytics = {
            sent: response.sent || 0,
            notSent: response.notSent || 0,
            bounced: response.bounced || 0,
            errors: response.errors || 0
          };
        }
        this.errorMessage = null;
      },
      error => {
        console.error('Error al enviar la campaña:', error);
        this.errorMessage = 'Hubo un error al enviar la campaña.';
      }
    );
  }
}
