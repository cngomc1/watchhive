import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ruchers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ruchers.component.html'
})
export class RuchersComponent implements OnInit {
  ruchers: any[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.api.getRuchers().subscribe((r: any[]) => this.ruchers = r || [], err => {
      console.warn('getRuchers err', err);
      this.ruchers = [];
    });
  }

  goDetail(id: any) {
    this.router.navigate(['/ruchers', id]);
  }

  deleteRucher(id: any) {
    alert('Supprimer ' + id + ' (à implémenter)');
  }

  editRucher(id: any) {
    alert('Modifier ' + id + ' (à implémenter)');
  }
}
