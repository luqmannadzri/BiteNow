import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResInfoPage } from './res-info.page';

const routes: Routes = [
  {
    path: '',
    component: ResInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResInfoPageRoutingModule {}
