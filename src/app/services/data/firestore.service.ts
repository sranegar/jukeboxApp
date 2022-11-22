import { Injectable } from '@angular/core';
import { idToken } from '@angular/fire/auth';
 
import { addDoc, collection, Firestore, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Song } from '../../models/song.interface';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private readonly firestore: Firestore) {}

  createSong(song: Song)  {
    const songsRef = collection(this.firestore, 'songs');
    return addDoc(songsRef, song); 
  }
  
  getSongs(): Observable<Song[]> {
    const songsRef = collection(this.firestore, "songs");
    return collectionData(songsRef, {idField: 'id'}) as Observable<Song[]>;
}
}
