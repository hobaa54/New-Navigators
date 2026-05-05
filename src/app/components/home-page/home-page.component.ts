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
  private selectionService = inject(SelectionService);

  selectedRoad: any = null;
  showError = false;

  // البيانات (مستقبلاً ستأتي من API)
  roads = [
    {
      id: 2,
      name: ' السويس',
      places: [
        { id: 1, name: 'مبيت ظباط', building: 1 },
        { id: 2, name: 'مبيت ظباط', building: 2 },
        { id: 3, name: 'كافتيريا', building: 1 },
        { id: 4, name: 'مبيت القائد', building: 1 },

        
      ]
    },
    {
      id: 3,
      name: ' مطروح',
      places: [
        { id: 6, name: 'مبيت ظباط', building: 1 },
        { id: 7, name: 'مبيت ظباط', building: 2 },
        { id: 8, name: 'كافتيريا', building: 1 }
      ]
    },
       {
      id: 3,
      name: ' الاسماعيليه',
      places: [
        { id: 6, name: 'مبيت ظباط', building: 1 },
        { id: 7, name: 'مبيت ظباط', building: 2 },
        { id: 8, name: 'كافتيريا', building: 1 }
      ]
    },{
      id: 3,
      name: ' الاسماعيليه',
      places: [
        { id: 6, name: 'مبيت ظباط', building: 1 },
        { id: 7, name: 'مبيت ظباط', building: 2 },
        { id: 8, name: 'كافتيريا', building: 1 }
      ]
    },{
      id: 3,
      name: ' الاسماعيليه',
      places: [
        { id: 6, name: 'مبيت ظباط', building: 1 },
        { id: 7, name: 'مبيت ظباط', building: 2 },
        { id: 8, name: 'كافتيريا', building: 1 }
      ]
    },{
      id: 3,
      name: ' الاسماعيليه',
      places: [
        { id: 6, name: 'مبيت ظباط', building: 1 },
        { id: 7, name: 'مبيت ظباط', building: 2 },
        { id: 8, name: 'كافتيريا', building: 1 }
      ]
    },{
      id: 3,
      name: ' الاسماعيليه',
      places: [
        { id: 6, name: 'مبيت ظباط', building: 1 },
        { id: 7, name: 'مبيت ظباط', building: 2 },
        { id: 8, name: 'كافتيريا', building: 1 }
      ]
    },{
      id: 3,
      name: ' الاسماعيليه',
      places: [
        { id: 6, name: 'مبيت ظباط', building: 1 },
        { id: 7, name: 'مبيت ظباط', building: 2 },
        { id: 8, name: 'كافتيريا', building: 1 }
      ]
    },{
      id: 3,
      name: ' الاسماعيليه',
      places: [
        { id: 6, name: 'مبيت ظباط', building: 1 },
        { id: 7, name: 'مبيت ظباط', building: 2 },
        { id: 8, name: 'كافتيريا', building: 1 }
      ]
    },{
      id: 3,
      name: ' الاسماعيليه',
      places: [
        { id: 6, name: 'مبيت ظباط', building: 1 },
        { id: 7, name: 'مبيت ظباط', building: 2 },
        { id: 8, name: 'كافتيريا', building: 1 }
      ]
    },{
      id: 3,
      name: ' الاسماعيليه',
      places: [
        { id: 6, name: 'مبيت ظباط', building: 1 },
        { id: 7, name: 'مبيت ظباط', building: 2 },
        { id: 8, name: 'كافتيريا', building: 1 },
      ]
    },{
      id: 3,
      name: ' الاسماعيليه',
      places: [
        { id: 6, name: 'مبيت ظباط', building: 1 },
        { id: 7, name: 'مبيت ظباط', building: 2 },
        { id: 8, name: 'كافتيريا', building: 1 }
      ]
    },{
      id: 3,
      name: ' الاسماعيليه',
      places: [
        { id: 6, name: 'مبيت ظباط', building: 1 },
        { id: 7, name: 'مبيت ظباط', building: 2 },
        { id: 8, name: 'كافتيريا', building: 1 }
      ]
    },{
      id: 3,
      name: ' الاسماعيليه',
      places: [
        { id: 6, name: 'مبيت ظباط', building: 1 },
        { id: 7, name: 'مبيت ظباط', building: 2 },
        { id: 8, name: 'كافتيريا', building: 1 }
      ]
    },
  ];

  goToDetails(): void {
    if (!this.selectedRoad) {
      this.showError = true;
      return;
    }

    this.showError = false;

    // 1. تصفير السيرفيس تماماً لبدء رحلة جديدة
    this.selectionService.clearAll();

    // 2. تخزين الطريق المختار في السيرفيس (لدعم الريفرش والـ Electron)
    this.selectionService.selectedRoad = this.selectedRoad;

    // 3. الانتقال لصفحة الطرق
    this.router.navigate(['/road'], {
      state: { road: this.selectedRoad }
    });
  }
}