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
  songList: Observable<Song[]> = this.firestoreService.getSongs();
  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.fetchSongs();
    let songRes = this.songList;
    songRes.subscribe(res => {
     
      res.forEach(song => {
        let s = song;
        s['$id'] = song.id;
        (s as Song)
      })
    })
  }

  fetchSongs() {
    this.songList.subscribe(res => {
      console.log(res)
    })
  }
}
