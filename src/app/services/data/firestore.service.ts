import { Injectable } from '@angular/core';
import { idToken } from '@angular/fire/auth';
 
import {
  addDoc,
  collection,
  Firestore,
  collectionData,
  docData,
  doc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Song } from '../../models/song.interface';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  createSong(song: Song) {
    const songsRef = collection(this.firestore, 'songs');
    return addDoc(songsRef, song);
  }

  getSongs(): Observable<Song[]> {
    const songsRef = collection(this.firestore, 'songs');
    return collectionData(songsRef, { idField: 'id' }) as Observable<Song[]>;
  }
  getSongDetail(id: string): Observable<Song> {
   const songRef = doc(this.firestore, `songs/${id}`);
   return docData(songRef, {
     idField: 'id',
   }) as Observable<Song>; 
  }
  deleteSong(song: Song): Promise<void> {
    const songDocRef = doc(this.firestore, `songs/${song.id}`);
   
    return deleteDoc(songDocRef);
  }
}
