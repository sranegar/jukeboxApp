import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Song } from '../models/song.interface';
import { FirestoreService } from '../services/data/firestore.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public song = {};
  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    const songId = this.route.snapshot.paramMap.get('id');

    this.song = this.firestoreService.getSongDetail(songId);
    this.firestoreService.getSongDetail(songId).subscribe((song) => {
      this.song = song;
    });
  }

  async deleteSong(
    id: string,
    name: string,
    artist: string,
    file: string
  ): Promise<void> {
    const song = { id, name, artist, file };
    const alert = await this.alertController.create({
      message: `Are you sure you want to delete ${name} by ${artist}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log(`Cancel deleting: ${name} by ${artist}`);
          },
        },
        {
          text: 'Okay',
          handler: () => {
            this.firestoreService.deleteSong(song).then(() => {
              this.router.navigateByUrl('/home');
            });
          },
        },
      ],
    });
    await alert.present();
  }
}
