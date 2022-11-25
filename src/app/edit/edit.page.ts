import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    private firestoreService: FirestoreService,
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.firestoreService.getSongDetail(this.id).subscribe(res => {
      this.updateSongForm.setValue(res);
    })
  }

  ngOnInit() {
    this.updateSongForm = this.fb.group({
      name: [''],
      artist: [''],
      file: ['']
    })
    console.log(this.updateSongForm.value);
  }
  updateForm() {
    this.firestoreService.updateSong(this.id, this.updateSongForm.value)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(error => console.log(error));
  }
}