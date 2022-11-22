import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from '../services/data/firestore.service';
import { Song } from '../models/song.interface';
 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  menuType: string = 'overlay';
  public songs = [];
  songList: Observable<Song[]> = this.firestoreService.getSongs();
  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.songList.subscribe((songs) => {
      this.songs = songs;
 
    });
  }

}
