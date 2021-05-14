import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfessoratPageRoutingModule } from './professorat-routing.module';

import { ProfessoratPage } from './professorat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfessoratPageRoutingModule
  ],
  declarations: [ProfessoratPage]
})
export class ProfessoratPageModule {}
