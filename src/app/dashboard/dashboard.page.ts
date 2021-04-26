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

 
  restName: string;
  restThumbnail: string;
  restDescription: string;
  public restList: Array<any> = [];


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


    //Get Restaurants
    this.firestore.collection("Restaurant")
    .get()
    .toPromise()
    .then(function(querySnapshot) {
        var restaurants = [];
        let restList = [];
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            restaurants.push(doc.data());
            restList = restaurants;
            // console.log(doc.data()['restName']);
        });
        console.log(restList);
        
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });



  }

}
