import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntroPageRoutingModule } from './intro-routing.module';

import { IntroPage } from './intro.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; //Importamos el custom_element_schema

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroPageRoutingModule
  ],
  declarations: [IntroPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Añadimos el custom_element_schema
})
export class IntroPageModule {}
