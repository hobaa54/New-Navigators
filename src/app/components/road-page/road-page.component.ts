import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { SelectionService } from '../../services/selection.service';
@Component({
  selector: 'app-road-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './road-page.component.html',
  styleUrl: './road-page.component.css'
})
export class RoadPageComponent implements OnInit {

  // حقن السيرفيس
  private selectionService = inject(SelectionService);
  private router = inject(Router);

  // ربط المتغيرات بالسيرفيس
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
  ngOnInit(): void {
    // 1. لو في طريق جاي في الـ state (جاي من صفحة الـ Home)
    if (history.state && history.state.road) {
      this.selectedRoad = history.state.road;
    }

    // 2. تأكد إن الـ places موجودة (سواء من الـ state أو الـ localStorage اللي في السيرفيس)
    if (this.selectedRoad) {
      this.places = this.selectedRoad.places || [];
    } else {
      // لو مفيش طريق خالص (مثلاً فتح الصفحة دايركت بدون اختيار)
      // ممكن توجيهه لصفحة الـ home
      // this.router.navigate(['/']);
    }
  }

  // دالة لمسح البيانات المخزنة في السيرفيس
  resetSelections() {
    this.selectedPlace = null;
    this.selectedBuilding = null;
    this.buildings = [];
    // لا نمسح الـ places هنا لأنها ستُعاد تعبئتها من الطريق الجديد فوراً
  }
  onSelectPlace() {
    if (!this.selectedPlace) return;

    const samePlaces = this.places.filter(
      p => p.name === this.selectedPlace.name
    );

    this.buildings = samePlaces.length > 1 ? samePlaces.map(p => p.building) : [];
    this.selectedBuilding = null;
  }

  goToDetails(): void {
    // الشرط الجديد: 
    // 1. يجب اختيار مكان أولاً (selectedPlace)
    // 2. إذا كانت هناك مباني متاحة (buildings.length > 0)، يجب اختيار مبنى (selectedBuilding)

    const isPlaceSelected = !!this.selectedPlace;
    const hasBuildings = this.buildings.length > 0;
    const isBuildingSelected = !!this.selectedBuilding;

    if (!isPlaceSelected || (hasBuildings && !isBuildingSelected)) {
      this.showError = true;
      return;
    }

    this.showError = false;

    this.router.navigate(['/place'], {
      state: {
        road: this.selectedRoad,
        place: this.selectedPlace,
        building: this.selectedBuilding // لو مفيش مبنى هتبعت null عادي
      }
    });
  }
}