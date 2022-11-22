import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/data/firestore.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  createSongForm: FormGroup;
  constructor(
    private readonly loadingCtrl: LoadingController,
    private readonly alertCtrl: AlertController,
    private firestoreService: FirestoreService,
    formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createSongForm = formBuilder.group({
      songName: ['', Validators.required],
      artistName: ['', Validators.required],
      fileName: ['', Validators.required],
    });
  }

  ngOnInit() {}

  async createSong(song) {
    const loading = await this.loadingCtrl.create();

    const name = this.createSongForm.value.songName;
    const artist = this.createSongForm.value.artistName;
    const file = this.createSongForm.value.fileName;
    song = { name, artist, file };

    this.firestoreService.createSong(song).then(
      () => {
        loading.dismiss().then(() => {
          this.router.navigateByUrl('/home');
        });
      },
      (error) => {
        loading.dismiss().then(() => {
          console.error(error);
        });
      }
    );

    return await loading.present();
  }
}
