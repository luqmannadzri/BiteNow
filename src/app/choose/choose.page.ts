import { Component, OnInit, ComponentRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { Router,NavigationExtras } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-choose',
  templateUrl: './choose.page.html',
  styleUrls: ['./choose.page.scss'],
})
export class ChoosePage implements OnInit {

  public tableList: Array<any>;
  public disabled: Array<any>;
  restID: any;
  tableNumber: number;
  tableAvailability: boolean;

    constructor( 
      
      public alertController: AlertController,
      public navCtrl: NavController,
      private router: Router,
      private authService: AuthenticateService,
      public firestore: AngularFirestore,
      private route: ActivatedRoute
    
      ) { 
        this.route.queryParams.subscribe(params => {
          this.restID = params['id']; 

         
        });
      }


    ngOnInit() {

          //Get Table
          this.firestore.collection("Restaurant").doc(this.restID).collection("Table")
          .get()
          .toPromise()
          .then(res => {
             
              this.tableList = [];
              
              res.forEach(doc => {
         
                this.tableList.push(
                  {
                    Availability: doc.data().Availability, 
                    tableNo: doc.data().tableNo,
                    disabled: doc.data().Availability
                  });
                  // this.tableList.push(doc.data());
                  // console.log("tengoksini", doc.data().disabled);
                  // console.log("ni id dia", doc.data());
              });
              
          })
    }
    
    public buttonToggle(tables){
      //inverted boolean to toggle
          tables.Availability=!tables.Availability;


    }

    showAlert() {

      this.alertController.create({
        header: 'Successful',
        subHeader: 'Booking is confirmed!',
        message: 'Please refer to booking page and present it at the restaurant',
        buttons: ['OK']
      }).then(res => {
  
        res.present();
  
      });
  
    }
    
 
}


