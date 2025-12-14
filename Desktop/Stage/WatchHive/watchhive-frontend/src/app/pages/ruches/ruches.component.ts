import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ruches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ruches.component.html'
})
export class RuchesComponent implements OnInit {
  ruches: any[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.api.getRuches().subscribe((r: any[]) => this.ruches = r || [], err => {
      console.warn('getRuches err', err);
      this.ruches = [];
    });
  }

  goDetail(id: any) {
    this.router.navigate(['/ruches', id]);
  }
}
