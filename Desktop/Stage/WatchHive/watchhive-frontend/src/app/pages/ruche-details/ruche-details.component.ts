import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ruche-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ruche-details.component.html'
})
export class RucheDetailsComponent implements OnInit {
  ruche: any = null;
  attributes: any[] = [];

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.api.getRuche(id).subscribe((r: any) => {
      this.ruche = r || {};
      this.buildAttributes();
    }, err => {
      console.warn('Erreur getRuche', err);
      this.ruche = {};
      this.buildAttributes();
    });
  }

  buildAttributes() {
    // Exemple : 6 attributs (temp, humidity, weight, rain, battery, signal)
    this.attributes = [
      { label: 'Température', value: this.ruche?.temp ?? '--', isGood: (this.ruche?.temp ?? 0) < 40 },
      { label: 'Humidité', value: this.ruche?.humidity ?? '--', isGood: (this.ruche?.humidity ?? 0) < 80 },
      { label: 'Poids', value: this.ruche?.weight ?? '--', isGood: (this.ruche?.weight ?? 0) >= 0 },
      { label: 'Pluie', value: this.ruche?.rain ?? '--', isGood: !(this.ruche?.rain) },
      { label: 'Batterie', value: this.ruche?.battery ?? '--', isGood: (this.ruche?.battery ?? 0) > 20 },
      { label: 'Signal', value: this.ruche?.signal ?? '--', isGood: (this.ruche?.signal ?? 0) > 30 }
    ];
  }

  gotoAlertHistory() {
    this.router.navigate(['/alert-history']);
  }
}
