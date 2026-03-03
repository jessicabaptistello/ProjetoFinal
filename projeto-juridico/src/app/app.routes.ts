import { Routes } from '@angular/router';
import { AppComponent } from './app';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: AppComponent },
  { path: 'novo-processo', component: AppComponent },
  { path: 'lista/:filtro', component: AppComponent } // Rota para a lista filtrada
];