import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { SelectionService } from '../../services/selection.service';
import { NgSelectModule } from '@ng-select/ng-select'; // <-- 1. استيراد المكتبة
@Component({
  selector: 'app-road-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgSelectModule],
  templateUrl: './road-page.component.html',
  styleUrl: './road-page.component.css'
})
export class RoadPageComponent implements OnInit {

  private selectionService = inject(SelectionService);
  private router = inject(Router);

  // ربط المتغيرات بالسيرفيس مباشرة (Getters & Setters)
  get selectedRoad() { return this.selectionService.selectedRoad; }
  set selectedRoad(val) { this.selectionService.selectedRoad = val; }

  get selectedPlace() { return this.selectionService.selectedPlace; }
  set selectedPlace(val) { this.selectionService.selectedPlace = val; }

  get selectedBuilding() { return this.selectionService.selectedBuilding; }
  set selectedBuilding(val) { this.selectionService.selectedBuilding = val; }

  get places() { return this.selectionService.places; }
  set places(val) { this.selectionService.places = val; }

  get buildings() { return this.selectionService.buildings; }
  set buildings(val) { this.selectionService.buildings = val; }

  showError = false;

  // فلتـرة الأسماء المتكررة لعرضها في السيلكت الأول (لحل مشكلة التكرار في الصورة)
  uniquePlacesList: any[] = []; // متغير جديد

  ngOnInit(): void {
    // جلب البيانات من الـ state أو الاستمرار باستخدام بيانات السيرفيس (localStorage)
    if (history.state && history.state.road) {
      this.selectedRoad = history.state.road;
    }

    if (this.selectedRoad) {
      this.places = this.selectedRoad.places || [];
      // احسب القائمة الفريدة مرة واحدة هنا
      this.calculateUniquePlaces();
    }
  }
  calculateUniquePlaces() {
    const seenNames = new Set();
    this.uniquePlacesList = this.places.filter(place => {
      if (seenNames.has(place.name)) return false;
      seenNames.add(place.name);
      return true;
    });
  }

  onSelectPlace() {
    this.showError = false; // تصفير الخطأ عند تغيير الاختيار

    if (!this.selectedPlace) {
      this.buildings = [];
      this.selectedBuilding = null;
      return;
    }

    // جلب كل الأماكن التي لها نفس الاسم المختار لمعرفة مبانيها
    const samePlaces = this.places.filter(p => p.name === this.selectedPlace.name);
    this.buildings = samePlaces.map(p => p.building);

    // --- التعديل الذكي (Auto-selection) ---
    if (this.buildings.length === 1) {
      // لو المكان ملوش غير مبنى واحد، نختاره فوراً للمستخدم
      this.selectedBuilding = this.buildings[0];
    } else {
      // لو في أكتر من مبنى، لازم المستخدم يختار بنفسه
      this.selectedBuilding = null;
    }
  }

  goToDetails(): void {
    // التحقق من أن الاختيارات مكتملة
    const isPlaceSelected = !!this.selectedPlace;
    const hasMultipleBuildings = this.buildings.length > 1;
    const isBuildingSelected = !!this.selectedBuilding;

    // يظهر الخطأ فقط إذا لم يختار المكان، أو إذا كان هناك عدة مباني ولم يحدد أحدها
    if (!isPlaceSelected || (hasMultipleBuildings && !isBuildingSelected)) {
      this.showError = true;
      return;
    }

    this.showError = false;
    this.router.navigate(['/place'], {
      state: {
        road: this.selectedRoad,
        place: this.selectedPlace,
        building: this.selectedBuilding
      }
    });
  }
}