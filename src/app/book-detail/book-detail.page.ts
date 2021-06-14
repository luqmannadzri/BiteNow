import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.page.html',
  styleUrls: ['./book-detail.page.scss'],
})
export class BookDetailPage implements OnInit {

  date: string;
  noPerson : number;
  restName: string;
  tableNo : Array<any>;
  time: string;
  userID: string;
  public bookList: Array<any>;
  bookID: any;
  bookingID: any;
  uid: string;
  userName: string;

  constructor(

    private navCtrl: NavController,
    private router: Router,
    private authService: AuthenticateService,
    public firestore: AngularFirestore,
    private route: ActivatedRoute

  ){

    this.route.queryParams.subscribe(params => {
      this.bookID = params['id']; 
     
    });
    console.log('id');

   }

  ngOnInit() {

    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.uid = res.uid;
    

    this.firestore.collection("Booking").doc(this.bookID).get()
    .toPromise() //guna utk enable pakai then
    .then(res => {
      
      this.restName = res.data()['restName'];
      this.date = res.data()['date'];
      this.noPerson = res.data()['noPerson'];
      this.time = res.data()['time'];
      this.userID = res.data()['uid'];
      this.bookingID =res.data()['bookingID']
      this.tableNo =res.data()['tableNo']


    })

    this.firestore.collection("People").doc(this.uid).get()
    .toPromise() //guna utk enable pakai then
    .then(res => {
      
      this.userName = res.data()['fname'];
    
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
