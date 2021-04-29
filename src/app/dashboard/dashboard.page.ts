import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { Router,NavigationExtras } from '@angular/router';
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
  public restList: Array<any>;

  constructor(
    public navCtrl: NavController,
    private router: Router,
    private authService: AuthenticateService,
    public firestore: AngularFirestore,
  ) { }

  profile() {
    this.router.navigate(['/profile']);
  }

  resInfo(restNameID) {
    // console.log("jadi ni",restName);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: restNameID
      }
    };

    this.router.navigate(['/res-info'], navigationExtras);
  }

  ngOnInit() {
    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;

        //Get Restaurants
        this.firestore.collection("Restaurant")
        .get()
        .toPromise()
        .then(res => {
            console.log("ni id", res)
           
            this.restList = [];
            
            res.forEach(doc => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                // console.log("ni id dia", doc.data())
                this.restList.push(doc.data());
                // console.log(doc.data()['restName']);
            });
            // this.restList = restaurants;
            // console.log(restaurants);

        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    })



  }

}
