import { Injectable } from '@angular/core';
 
import { addDoc, collection, Firestore, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Song } from '../../models/song.interface';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private readonly firestore: Firestore) {}

  // createSong(
  //   songName: string,
  //   artistName: string,
  //   fileName: string
  // ): Promise<void> {
  //    return addDoc(collection(firestore, "songs"), {
  //      id,
  //      songName,
  //     artistName,
  //     fileName,
  //    });
  // }
  
  getSongs(): Observable<Song[]> {
    const songsRef = collection(this.firestore, "songs");
    return collectionData(songsRef, {idField: 'id'}) as Observable<Song[]>;
}
}
