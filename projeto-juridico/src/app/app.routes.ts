import { Routes } from '@angular/router';
import { ListaPageComponent } from './pages/lista/lista';
import { DetalhePageComponent } from './pages/detalhe/detalhe';
import { FormularioPageComponent } from './pages/formulario/formulario';
import { DashboardPageComponent } from './dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'lista', component: ListaPageComponent },

  // Requisito: rota dinâmica
  { path: 'detalhe/:id', component: DetalhePageComponent },

  { path: 'novo-processo', component: FormularioPageComponent },
  { path: 'editar/:id', component: FormularioPageComponent },

  { path: '**', redirectTo: 'dashboard' },
];