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
  song: Song;
  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    const songId: string = this.route.snapshot.paramMap.get('id');

    this.firestoreService.getSongDetail(songId).subscribe((song) => {
      this.song = song;
    });
  }

  async deleteSong(id: string, name: string): Promise<void> {
      const alert = await this.alertController.create({
        message: `Are you sure you want to delete ${name}`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            },
          },
          {
            text: 'Okay',
            handler: () => {
              this.firestoreService.deleteSong(id).then(() => {
                this.router.navigateByUrl('/home');
              });
            },
          },
        ],
      });
    await alert.present();
    
  }
 
}
