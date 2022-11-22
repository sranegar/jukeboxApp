import { Injectable } from '@angular/core';
import { Song } from '../shared/Song';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  addedSongRef: AngularFireList<any>;
  addedRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }
  //create
  createNewSong(song: Song) {
    return this.addedSongRef.push({
      name: song.name,
      artist: song.artist,
      file: song.file,
    })
  }
  //Get single
  getSong(id: string) {
    this.addedRef = this.db.object('/songs/' + id);
    return this.addedRef;
  }
  //Get List
  getSongList() {
    this.addedSongRef = this.db.list('/songs');
    return this.addedSongRef;
  }
  //Update
  updateSong(id, song: Song) {
    return this.addedRef.update({
      name: song.name,
      artist: song.artist,
      file: song.file,
    })
  }
  //Delete
  deleteSong(id: string) {
    this.addedRef = this.db.object('/songs/' + id);
    this.addedRef.remove();
  }
}
