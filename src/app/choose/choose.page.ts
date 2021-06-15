import { Component, OnInit, ComponentRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { Router,NavigationExtras } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import 'firebase/firestore';
import { BookingPage } from '../booking/booking.page';
import { identifierModuleUrl } from '@angular/compiler';


@Component({
  selector: 'app-choose',
  templateUrl: './choose.page.html',
  styleUrls: ['./choose.page.scss'],
})
export class ChoosePage implements OnInit {

  public tableList: Array<any>;
  public disabled: Array<any>;
  public booked_tables: Array<any>;
  public date;
  public seats=0;
  public time: string;
  displayDate: any = moment().format();
  restID: any;
  uid: string;
  restName: string;
  bookingID: string;

  // tableNumber: number;
  // tableAvailability: boolean;

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
      this.booked_tables = [];

      this.authService.userDetails().subscribe(res => {
        this.uid = res.uid;
      }, err => {
        console.log('err', err);
      })

          //Get Table
          const rest = this.firestore.collection("Restaurant").doc(this.restID);

          rest.collection("Table")
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

          rest.get().toPromise().then(res => {
           this.restName = res.data()['restName'];
          })
    }

    getDate(){
      this.date = moment(this.date).format('YYYY-MM-DD');
      console.log(this.date);
    }

    segmentChanged(ev: any) {
      console.log('Segment changed', ev.target.value);
      this.time=ev.target.value;
    }

    increaseSeat(){
      if (this.seats<12){
        this.seats=this.seats+1;
      }
      console.log(this.seats);
    }

    decreaseSeat(){
      if (this.seats>0){
        this.seats=this.seats-1;
      }
      
      console.log(this.seats);
    }
    
    public buttonToggle(tables){
      //inverted boolean to toggle
          tables.Availability=!tables.Availability;
      //check tableNo
          tables.tableNo=tables.tableNo;
      //check the value change
          console.log(tables.Availability, "table" ,tables.tableNo);

          if (tables.Availability == false){
            // check if tableNo already exists in array
            this.booked_tables.push(tables.tableNo);
          }else{
            console.log("please remove");
            this.booked_tables.map((tableno, index) => {
              if(tableno[index]==tables.tableNo){
                this.booked_tables.splice(index,index);
              }
            })
          }
          console.log(this.booked_tables," tables selected");

    }

    showAlert() {

      this.firestore.collection('Booking').add(
        {
          date: this.date,
          noPerson: this.seats,
          time: this.time,
          tableNo: ['1','2'],
          uid: this.uid,
          restName: this.restName,

          
        }).then(res => {
            this.firestore.collection('Booking').doc(res.id).update(
              {
                bookingID: res.id
              }
            )
        });

      this.alertController.create({
        header: 'Successful!',
        subHeader: 'Your table has been booked',
        message: 'Please refer to booking page and present it at the restaurant',
        buttons: [
          {
            text: 'Okay',
            handler: () => {
              this.navCtrl.back();
            }
          }
        ]
      }).then(res => {
  
        res.present();
  
      });
  
    }
    
 
}


