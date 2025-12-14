import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { ApiService } from '../../services/api.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
    standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, AfterViewInit {

  map!: L.Map;
  hasAlert = false;
  totalRuches = 0;
  totalRuchers = 0;

  chart: any;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadSummary();
  }

  ngAfterViewInit(): void {
    // create chart only after the canvas exists in DOM
    setTimeout(() => {
      this.createChart([], []);
    }, 200);
  }

  loadSummary() {
    this.api.getRuchers().subscribe(
      (r: any) => {
        const ruchers = r as any[];
        this.totalRuchers = ruchers?.length || 0;
        this.hasAlert = ruchers?.some(x => x.hasAlert);
        this.placeMarkers(ruchers || []);
      },
      err => {
        console.warn('Erreur getRuchers', err);
        this.totalRuchers = 0;
      }
    );

    this.api.getRuches().subscribe(
      (r: any) => {
        const ruches = r as any[];
        this.totalRuches = ruches?.length || 0;

        const labels = (ruches || []).map((_, i) => `T${i + 1}`);
        const data = (ruches || []).map(x => x.weight || 0);

        this.createChart(labels, data);
      },
      err => {
        console.warn('Erreur getRuches', err);
      }
    );
  }

  createChart(labels: string[], data: number[]) {
    const canvas = document.getElementById('weightChart') as HTMLCanvasElement;

    if (!canvas) return;

    if (this.chart) this.chart.destroy();

    this.chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Poids (kg)',
            data,
            borderWidth: 2,
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  }

  initMap() {
    if (this.map) return;

    this.map = L.map('map').setView([5.5, 13.5], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
  }

  placeMarkers(ruchers: any[]) {
    if (!this.map) this.initMap();

    (ruchers || []).forEach(r => {
      const lat = r.lat || r.latitude || 3.848;
      const lng = r.lng || r.longitude || 11.5;

      const beeSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="28" height="28">
          <circle cx="32" cy="32" r="28" fill="#FFD54F" stroke="#222" stroke-width="1"/>
          <path d="M20 34c0-8 12-12 12-12s12 4 12 12-12 6-12 6-12 2-12-6z" fill="#000" opacity="0.8"/>
        </svg>`;

      const icon = L.divIcon({ html: beeSvg, className: '' });

      const marker = (L.marker([lat, lng], { icon }) as any).addTo(this.map);
      marker.bindPopup(`<b>${r.name || 'Rucher'}</b><br/>${r.nbRuches || 0} ruches`);
    });
  }

  setMapView(view: 'ruchers' | 'ruches') {
    console.log('Switch map view', view);
  }
}
