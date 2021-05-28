import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfessoratPage } from './professorat.page';

const routes: Routes = [
  {
    path: '',
    component: ProfessoratPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfessoratPageRoutingModule {}
