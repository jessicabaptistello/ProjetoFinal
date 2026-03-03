import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  // Criamos os indicadores (KPIs)
  totalProcessos: number = 15;
  processosNovos: number = 3;
  processosAtivos: number = 10;
  processosConcluidos: number = 3;
}
