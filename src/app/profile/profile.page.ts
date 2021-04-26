import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userEmail: string;
  firstName: string;
  lastName: string;
  phone: string;
  uid: string;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    public firestore: AngularFirestore
  ) { }

  ngOnInit() {

    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;

        //get data from firestore based on current required user
        this.firestore.collection("People").doc(res.uid).get()
        .toPromise() //guna utk enable pakai then
        .then(res => {
          this.firstName = res.data()['fname'];
          this.lastName = res.data()['lname'];
          this.phone = res.data()['phone'];
          console.log("nahh email",res.data()['fname']) //debug
        })

      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    })
  }

  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
  }
}
