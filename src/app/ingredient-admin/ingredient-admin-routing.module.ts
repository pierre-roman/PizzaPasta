import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngredientAdminPage } from './ingredient-admin.page';

const routes: Routes = [
  {
    path: '',
    component: IngredientAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngredientAdminPageRoutingModule {}
