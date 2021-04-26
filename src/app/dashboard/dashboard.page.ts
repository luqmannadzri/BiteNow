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
  // @Input() postDatas: any [];

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

    //Get Restaurants
    this.firestore.collection("Restaurant")
    .get()
    .toPromise()
    .then(function(querySnapshot) {
        var restaurants = [];
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            restaurants.push(doc.data());
            // this.postDatas = restaurants;
            // console.log(doc.data()['restName']);
        });
        console.log(restaurants);
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });



  }

}
