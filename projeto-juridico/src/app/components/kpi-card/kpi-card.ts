import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './kpi-card.html',
  styleUrl: './kpi-card.css',
})
export class KpiCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) value!: number;
  @Input() subtitle = '';
  @Input() link: any[] | string = '/';
  @Input() bgClass: 'bg-blue' | 'bg-green' | 'bg-orange' | 'bg-gray' = 'bg-blue';
}