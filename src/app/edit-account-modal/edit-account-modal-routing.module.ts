import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAccountModalPage } from './edit-account-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditAccountModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAccountModalPageRoutingModule {}
