import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface AlertSetting {
  id: number;
  name: string;
  min: number;
  max: number;
  enabled: boolean;
}

@Component({
  selector: 'app-alert-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alert-settings.component.html'
})

export class AlertSettingsComponent {

  attrs: AlertSetting[] = [];
  loading = false;
  saving = false;
  errorMessage = '';
  successMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAlertSettings();
  }

  // ============================
  // 🔥 1. RÉCUPÉRER LES PARAMÈTRES
  // ============================
  getAlertSettings() {
    this.loading = true;
    this.errorMessage = '';

    this.http.get<AlertSetting[]>('http://localhost:3000/alert-settings')
      .subscribe({
        next: (data) => {
          this.attrs = data;
          this.loading = false;
        },
        error: () => {
          this.errorMessage = "Impossible de charger les paramètres d'alertes.";
          this.loading = false;
        }
      });
  }

  // ===============================
  // 🔥 2. SAUVEGARDER DANS LE BACKEND
  // ===============================
  save() {
    this.saving = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.http.put('http://localhost:3000/alert-settings', this.attrs)
      .subscribe({
        next: () => {
          this.saving = false;
          this.successMessage = "Paramètres enregistrés avec succès !";
        },
        error: () => {
          this.saving = false;
          this.errorMessage = "Erreur lors de l’enregistrement.";
        }
      });
  }

  // ===============================
  // 🔥 3. RÉINITIALISER LES VALEURS
  // ===============================
  resetAlertSettings() {
    this.getAlertSettings();
    this.successMessage = "Réinitialisé.";
  }

  // ===============================
  // 🔥 4. ACTIVER / DÉSACTIVER SWITCH
  // ===============================
  toggle(alert: AlertSetting) {
    alert.enabled = !alert.enabled;
  }

  // ===============================
  // 🔥 5. MODIFIER MIN / MAX
  // ===============================
  updateValue(alert: AlertSetting, field: 'min' | 'max', event: any) {
    const value = Number(event.target.value);
    alert[field] = value;
  }
   // ===============================
  // 🔥 6. ANNULER LES MODIFICATIONS (sans appel API)
  // ===============================
  cancel() {
    // Restaurer depuis la copie originale (deep copy)
    // this.alerts = JSON.parse(JSON.stringify(this.originalAlerts || []));
    this.successMessage = "Modifications annulées.";
    this.errorMessage = '';
  }
}
