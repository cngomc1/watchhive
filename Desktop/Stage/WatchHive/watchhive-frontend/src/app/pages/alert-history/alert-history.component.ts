import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-alert-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-history.component.html'
})
export class AlertHistoryComponent implements OnInit {
  historiques: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getHistoriques().subscribe((h: any[]) => this.historiques = h || [], err => {
      console.warn('getHistoriques err', err);
      // fallback sample
      this.historiques = [
        { id: 1, title: 'Poids bas', receiver: '+237600000000', device: 'device-1', message: 'Poids < seuil' }
      ];
    });
  }
}
