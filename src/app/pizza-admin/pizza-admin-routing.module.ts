import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PizzaAdminPage } from './pizza-admin.page';

const routes: Routes = [
  {
    path: '',
    component: PizzaAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PizzaAdminPageRoutingModule {}
