import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import {Haptics, ImpactStyle} from '@capacitor/haptics';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  menuType: string = 'overlay';
  constructor() {}

   
 
  logout() {
    console.log('logout clicked');
  }

  addSong() {
    console.log('add song clicked');
  }
}
