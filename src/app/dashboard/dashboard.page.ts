import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userEmail: string;
  restName: string;
  restThumbnail: string;
  restDescription: string;

  constructor(
    private navCtrl: NavController,
    private route: Router,
    private authService: AuthenticateService,
    public firestore: AngularFirestore,
  ) { }

  profile() {
    this.route.navigate(['/profile']);
  }

  ngOnInit() {

    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;
      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    })

    this.firestore.collection("Restaurant")
    .get()
    .toPromise()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            // this.restName = res.data()['restName'];
            console.log(doc.data()['restName']);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    // snapshot.forEach(doc => {
    //   console.log("nanhhhhhhh",doc.data())
    // })

    // this.firestore.collection("Restaurant").add({
    //   restName: 'Aniq',
    //   restDesc: 'Fakhrul',
    //   restThumbnail: 'test'
    // });

  }

}
