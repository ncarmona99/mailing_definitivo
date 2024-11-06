import { provideRouter, Routes } from '@angular/router';
import { CampaignComponent } from './campaign/campaign.component';

export const routes: Routes = [
  { path: '', component: CampaignComponent }, // Ruta raíz que carga CampaignComponent
  { path: '**', redirectTo: '' } // Redirección a raíz para rutas no encontradas
];

export const appRouting = provideRouter(routes);
