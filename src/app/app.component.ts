import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
  this.authService.userDetails()
  }
  
 logoutUser() {
   this.authService.logout()
    .then(res => {
      console.log(res);
      this.router.navigateByUrl('/login', {replaceUrl: true})
    })
      .catch(error => {
      console.log(error)
    })
  }
}
