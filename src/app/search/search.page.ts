import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

public restList: any[];
public restListBackup: any[];


  constructor(
    public navCtrl: NavController,
    private router: Router,
    public firestore: AngularFirestore) { }

  resInfo(restNameID) {
   
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: restNameID
      }
    };

    this.router.navigate(['/res-info'], navigationExtras);
  }


  async ngOnInit() {
    this.restList = await this.initializeItems();
  }
  
  async initializeItems(): Promise<any> {
    const restList = await this.firestore.collection('Restaurant')
      .valueChanges().pipe(first()).toPromise();
    this.restListBackup = restList;
    return restList;
  }

  async filterList(evt) {
    this.restList = this.restListBackup;
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.restList = this.restList.filter(currentRest => {
      if (currentRest.restName && searchTerm) {
        return (currentRest.restName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }
  
  

}
