import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private _selectedRoad: any = null;

  set selectedRoad(val: any) {
    this._selectedRoad = val;
    if (val) {
      localStorage.setItem('currentRoad', JSON.stringify(val)); // حفظ في الذاكرة
    }
  }

  get selectedRoad() {
    if (!this._selectedRoad) {
      const saved = localStorage.getItem('currentRoad');
      if (saved) this._selectedRoad = JSON.parse(saved); // استرجاع لو موجود
    }
    return this._selectedRoad;
  }

  // باقي المتغيرات (Place, Building)
  selectedPlace: any = null;
  selectedBuilding: any = null;
  places: any[] = [];
  buildings: any[] = [];

  clearAll() {
    this._selectedRoad = null;
    localStorage.removeItem('currentRoad');
    this.selectedPlace = null;
    this.selectedBuilding = null;
    this.places = [];
    this.buildings = [];
  }
}
