import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  menuType: string = 'overlay';
  constructor() {}



  addBtn() {
   
    console.log('add song clicked');
  }
}
