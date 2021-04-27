import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResInfoPageRoutingModule } from './res-info-routing.module';

import { ResInfoPage } from './res-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResInfoPageRoutingModule
  ],
  declarations: [ResInfoPage]
})
export class ResInfoPageModule {}
