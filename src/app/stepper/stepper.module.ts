import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StepperPageRoutingModule } from './stepper-routing.module';

import { StepperPage } from './stepper.page';
import { ArchwizardModule } from 'angular-archwizard';

@NgModule({
  imports: [
    ArchwizardModule,
    CommonModule,
    FormsModule,
    IonicModule,
    StepperPageRoutingModule
  ],
  declarations: [StepperPage]
})
export class StepperPageModule {}
