import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  private router = inject(Router);
  selectedRoad: any = null;
  showError = false;

  roads = [
    {
      id: 2,
      name: 'طريق السويس',
      places: [
        { id: 1, name: 'مبيت ظباط', building: 1 },
        { id: 2, name: 'مبيت ظباط', building: 2 },
        { id: 3, name: 'كافتيريا', building: 1 }
      ]
    },
    {
      id: 3,
      name: 'طريق مطروح',
      places: [
        { id: 1, name: 'مبيت ظباط', building: 1 },
        { id: 2, name: 'مبيت ظباط', building: 2 },
        { id: 3, name: 'كافتيريا', building: 1 }
      ]
    }
  ];

  ngOnInit(): void {
    // كان فيه spinner واتشال خلاص
  }

  goToDetails(): void {
    if (!this.selectedRoad) {
      this.showError = true;
      return;
    }

    this.showError = false;

    this.router.navigate(['/details'], {
      state: { road: this.selectedRoad }
    });
  }
}