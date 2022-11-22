import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { SongsService } from './../shared/songs.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.page.html',
  styleUrls: ['./add-song.page.scss'],
})
export class AddSongPage implements OnInit {
  addSongForm: FormGroup;
  constructor(
    private songService: SongsService,
    private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.addSongForm = this.fb.group({
      name: [''],
      artist: [''],
      file: ['']
    })
  }
  
  formSubmit() {
    if (!this.addSongForm.valid) {
      return false;
    } else {
      this.songService
        .createNewSong(this.addSongForm.value)
        .then((res) => {
          console.log(res);
          this.addSongForm.reset();
          this.router.navigate(['/home']);
        })
        .catch((error) => console.log(error));
    }
  }

}
