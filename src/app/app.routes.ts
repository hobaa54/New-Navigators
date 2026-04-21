import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RoadPageComponent } from './components/road-page/road-page.component';
import { PlacePageComponent } from './components/place-page/place-page.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'road',
        component: RoadPageComponent
    },
       {
        path: 'place',
        component: PlacePageComponent
    }
];
