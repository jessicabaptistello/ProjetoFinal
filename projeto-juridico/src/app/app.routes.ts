import { Routes } from '@angular/router';

import { DashboardPageComponent } from './pages/dashboard/dashboard';
import { ListaPageComponent } from './pages/lista/lista';
import { DetalhePageComponent } from './pages/detalhe/detalhe';
import { FormularioPageComponent } from './pages/formulario/formulario';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'lista', component: ListaPageComponent },

  { path: 'detalhe/:id', component: DetalhePageComponent },
  { path: 'novo-processo', component: FormularioPageComponent },
  { path: 'editar/:id', component: FormularioPageComponent },

  { path: '**', redirectTo: 'dashboard' },
];