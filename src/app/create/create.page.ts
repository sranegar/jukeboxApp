import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService  } from '../services/data/firestore.service';
import {
  
  Firestore 
  
} from '@angular/fire/firestore';
import { Song } from '../models/song.interface';
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  createSongForm: FormGroup;
 
  selectedFile: any;
  songsRef: any;
 
  newFileName = '';
  constructor(
    private readonly loadingCtrl: LoadingController,
    private readonly alertCtrl: AlertController,
    private firestoreService: FirestoreService,
    formBuilder: FormBuilder,
    private router: Router,
 
  ) {
    this.songsRef = (this.firestoreService, "songs");
    this.createSongForm = formBuilder.group({
      songName: ['', Validators.required],
      artistName: ['', Validators.required],
      albumName: ['', Validators.required],
      fileName: ['', Validators.required],
    });
  }

  ngOnInit() {}
  chooseFile(event) {
    this.selectedFile = event.target.files[0];
    
  }
  
  addNewSong() {
    const name = this.createSongForm.value.songName;
    const artist = this.createSongForm.value.artistName;
    const album = this.createSongForm.value.albumName;
    const file = this.createSongForm.value.fileName;
    const song = ({ name, artist, album, file });
    this.firestoreService
      .addSong(song)
      .then((res) => {
        this.firestoreService.uploadFile(
          res.id,
          this.selectedFile
        );

       
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // async createSong(song) {
  //   const loading = await this.loadingCtrl.create();

  //   const name = this.createSongForm.value.songName;
  //   const artist = this.createSongForm.value.artistName;
  //   const album = this.createSongForm.value.albumName;
  //   const file = this.createSongForm.value.fileName;
  //   song = { name, artist, album, file };

  //   this.firestoreService.addSong(song).then(
  //     () => {
  //       loading.dismiss().then(() => {
  //         this.router.navigateByUrl('/home');
  //       });
  //     },
  //     (error) => {
  //       loading.dismiss().then(() => {
  //         console.error(error);
  //       });
  //     }
  //   );

  //   return await loading.present();
  // }
}
