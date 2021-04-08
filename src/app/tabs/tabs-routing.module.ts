import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [


  {
		path: '',
		component: TabsPage,
		children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../search/search.module').then( m => m.SearchPageModule)
      },
      {
        path: 'booking',
        loadChildren: () => import('../booking/booking.module').then( m => m.BookingPageModule)
      },
      {
        path: 'saved',
        loadChildren: () => import('../saved/saved.module').then( m => m.SavedPageModule)
      },
		]
	}	

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
