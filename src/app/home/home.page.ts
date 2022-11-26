import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from '../services/data/firestore.service';
import { Song } from '../models/song.interface';
import { Howl } from 'howler';
import { IonRange } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  menuType: string = 'overlay';
  activeSong: Song = null;
  player: Howl = null;
  isPlaying = false;
  progress = 0;
 
  @ViewChild('range', {static: false}) range: IonRange;

  public songs = [];
  songList: Observable<Song[]> = this.firestoreService.getSongs();
  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.songList.subscribe((songs) => {
      this.songs = songs;
       
    });
   
  }

  start(song: Song) {
    if (this.player) {
      this.player.stop();
    }
    
    this.player = new Howl({
      src: [song.file],
      html5: true,
      onplay: () => {
        this.isPlaying = true;
        this.activeSong = song;
        this.updateProgress();
       
        
      },
      onend: () => {

      }
    });
    this.player.play();
    
  }

  togglePlayer(pause) {
    this.isPlaying = !pause;
    if (pause) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }

  next() {
    let index = this.songs.indexOf(this.activeSong);
    if (index != this.songs.length - 1) {
      this.start(this.songs[index + 1])
    } else {
      this.start(this.songs[0])
    }
  }

  prev() {
    let index = this.songs.indexOf(this.activeSong);
    if (index > 0) {
      this.start(this.songs[index - 1]);
    } else {
      this.start(this.songs[this.songs.length - 1])
    }

  }

  seek() {
    let newValue = +this.range.value;
    let duration = this.player.duration();
    this.player.seek(duration * (newValue / 100));
  }

  updateProgress() {
    let seek = this.player.seek();
    this.progress = (seek / this.player.duration()) * 100 || 0;
    setTimeout(() => {
      this.updateProgress();
    }, 1000)
  }
}
