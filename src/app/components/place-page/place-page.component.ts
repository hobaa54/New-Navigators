import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './place-page.component.html',
  styleUrl: './place-page.component.css'
})
export class PlacePageComponent implements OnInit {

  road: any;
  place: any;
  building: any;

  ngOnInit(): void {
    const state = history.state;

    this.road = state.road;
    this.place = state.place;
    this.building = state.building;
  }

}