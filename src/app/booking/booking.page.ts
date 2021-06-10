import { Component, OnInit } from '@angular/core';
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

  constructor(

    public navCtrl: NavController,
    private router: Router,
    private authService: AuthenticateService,
    public firestore: AngularFirestore,

  ) { }

  bookDetail() {
    this.router.navigate(['/book-detail']);
  }

  ngOnInit() {
  }

}
