import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectionService } from '../../services/selection.service'; // تأكد من المسار الصحيح

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  private router = inject(Router);
  private selectionService = inject(SelectionService); // حقن السيرفيس

  selectedRoad: any = null;
  showError = false;

  roads = [
    {
      id: 2,
      name: 'طريق السويس',
      places: [
        { id: 1, name: 'مبيت ظباط', building: 1 },
        { id: 2, name: 'مبيت ظباط', building: 2 },
        { id: 3, name: 'كافتيريا', building: 1 },
        { id: 4, name: 'مبيت القائد', building: 2 },
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

  goToDetails(): void {
    if (!this.selectedRoad) {
      this.showError = true;
      return;
    }

    this.showError = false;

    // 1. تصفير أي اختيارات قديمة في السيرفيس (عشان تبدأ رحلة جديدة)
    this.selectionService.clearAll();

    // 2. تخزين الطريق الجديد في السيرفيس (ده هيخليه يتحفظ في localStorage لو نفذت حل الريفرش)
    this.selectionService.selectedRoad = this.selectedRoad;

    // 3. الانتقال لصفحة الـ road مع تمرير الـ state كزيادة تأكيد
    this.router.navigate(['/road'], {
      state: { road: this.selectedRoad }
    });
  }
}