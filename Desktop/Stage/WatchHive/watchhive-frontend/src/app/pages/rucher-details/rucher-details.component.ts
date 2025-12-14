import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rucher-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rucher-details.component.html'
})
export class RucherDetailsComponent implements OnInit {
  rucher: any = {};
  ruches: any[] = [];

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.api.getRucher(id).subscribe((r: any) => {
      this.rucher = r || {};
      this.ruches = r?.ruches || [];
    }, err => {
      console.warn('getRucher err', err);
      this.rucher = {};
      this.ruches = [];
    });
  }

  goRuche(id: any) {
    this.router.navigate(['/ruches', id]);
  }
}
