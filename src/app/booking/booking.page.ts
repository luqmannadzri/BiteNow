import { Component, OnInit, Query } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { Router,NavigationExtras } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {

  restName: string;
  date: string;
  public bookList: Array<any>;
  uid: string;

  constructor(

    public navCtrl: NavController,
    private router: Router,
    private authService: AuthenticateService,
    public firestore: AngularFirestore,

  ) { }

  bookDetail(bookingID) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: bookingID
      }
    };
    this.router.navigate(['/book-detail'], navigationExtras);
  }

  ngOnInit() {

    this.authService.userDetails().subscribe(res => {
  
      if (res !== null) {
        this.uid = res.uid;
        //Get Bookings
        this.firestore.collection("Booking")
        .get()
        .toPromise()
        .then(res => {
           
            this.bookList = [];
            
            res.forEach(doc => {

              if(doc.data()['uid']==this.uid){

                this.bookList.push(doc.data());

              }  
               
            });
          

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
