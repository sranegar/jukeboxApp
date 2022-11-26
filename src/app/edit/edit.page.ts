import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FirestoreService } from '../services/data/firestore.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  updateSongForm: FormGroup;
  id: any;
  selectedFile: any;
  constructor(
    private readonly loadingCtrl: LoadingController,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    private firestoreService: FirestoreService,
    private navCtrl: NavController
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.firestoreService.getSongDetail(this.id).subscribe((res) => {
      this.updateSongForm.setValue(res);
    });
  }

  ngOnInit() {
    this.updateSongForm = this.fb.group({
      name: [''],
      artist: [''],
      album: [''],
      file: [''],
    });
   
  }
  chooseFile(event) {
    this.selectedFile = event.target.files[0];
  }

 async updateForm() {
    const loading = await this.loadingCtrl.create();
    this.firestoreService
      .updateSong(this.id, this.updateSongForm.value)
      .then(() => {
        this.firestoreService.uploadFile(this.id, this.selectedFile);
         loading.dismiss().then(() => {
           this.router.navigateByUrl('/home');
         });
      })
      .catch((error) => {
         loading.dismiss().then(() => {
           console.error(error);
         });
      });
    return await loading.present();
  }
  navigateBack() {
    this.navCtrl.back();
  }
}
