import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-res-info',
  templateUrl: './res-info.page.html',
  styleUrls: ['./res-info.page.scss'],
})
export class ResInfoPage implements OnInit {

  userEmail: string;
  restName: string;
  restDisplay: string;
  restDescription: string;
  restAddress: string;
  public restList: Array<any>;
  restID: any;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthenticateService,
    public firestore: AngularFirestore,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.restID = params['id']; 
     
    });
    
   
   }

  booking(restNameID) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: restNameID
      }
    };
    
    this.router.navigate(['/choose'], navigationExtras);
  }

  ngOnInit() {
    this.authService.userDetails().subscribe(res => {
      
      if (res !== null) {
        this.userEmail = res.email;


        this.firestore.collection("Restaurant").doc(this.restID).get()
        .toPromise() //guna utk enable pakai then
        .then(res => {
          this.restName = res.data()['restName'];
          this.restDescription = res.data()['restDesc'];
          this.restAddress = res.data()['restAddress'];
          this.restDisplay = res.data()['restDisplay'];
          
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

