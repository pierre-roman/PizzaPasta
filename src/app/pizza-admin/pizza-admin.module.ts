import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PizzaAdminPageRoutingModule } from './pizza-admin-routing.module';

import { PizzaAdminPage } from './pizza-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PizzaAdminPageRoutingModule
  ],
  declarations: [PizzaAdminPage]
})
export class PizzaAdminPageModule {}
