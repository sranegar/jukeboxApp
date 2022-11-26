import { Injectable } from '@angular/core';
import { idToken } from '@angular/fire/auth';
import {
  Storage,
  ref,
  getDownloadURL,
  uploadBytes,
} from '@angular/fire/storage';
import {
  addDoc,
  collection,
  Firestore,
  collectionData,
  docData,
  doc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
 
import { Observable } from 'rxjs';
import { Song } from '../../models/song.interface';
import { setDoc } from '@firebase/firestore';
 
@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  fileName: string;
  constructor(private firestore: Firestore, private storage: Storage) {}

  async uploadFile(id: string, f) {
    const fileName = f.name;
    const path = `mp3/${fileName}`;
    const storageRef = ref(this.storage, path);
    try {
      await uploadBytes(storageRef, f);
      const mp3Url = await getDownloadURL(storageRef);
      const songDocRef = doc(this.firestore, `songs/${id}`);
      await updateDoc(songDocRef, { file: mp3Url });
      
      return true;
    } catch (e) {
      console.log('Upload mp3 file error:', e);
      return null;
    }
  }

  addSong(song: Song) {
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
  updateSong(id, song: Song) {
    const songsRef = doc(this.firestore, `songs/${id}`);
    return updateDoc(songsRef, {
      name: song.name,
      artist: song.artist,
      album: song.album,
      file: song.file,
    });
  }
}
