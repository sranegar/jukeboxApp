import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Song } from '../models/song.interface';
import { FirestoreService } from '../services/data/firestore.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  song: Song;
  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const songId: string = this.route.snapshot.paramMap.get('id');
  
    this.firestoreService.getSongDetail(songId).subscribe((song) => {
      this.song = song;
     
    });
  }

  // getSongById(id: string) {
  //   for (let i = 0; i < this.songs.length; i++) {
  //     const element = this.songs[i];
  //     if (element.id == cardId) {
  //       return element;
  //     }
  //   }
  // }
}
