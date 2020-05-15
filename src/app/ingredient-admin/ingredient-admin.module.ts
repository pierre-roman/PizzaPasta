import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngredientAdminPageRoutingModule } from './ingredient-admin-routing.module';

import { IngredientAdminPage } from './ingredient-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngredientAdminPageRoutingModule
  ],
  declarations: [IngredientAdminPage]
})
export class IngredientAdminPageModule {}
