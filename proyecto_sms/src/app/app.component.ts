import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CampaignComponent } from './campaign/campaign.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CampaignComponent],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'proyecto_sms';
}
