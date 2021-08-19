import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StepperPageRoutingModule } from './stepper-routing.module';

import { StepperPage } from './stepper.page';
import { NgWizardConfig, NgWizardModule, THEME } from 'ng-wizard';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StepperPageRoutingModule,
    NgWizardModule.forRoot(ngWizardConfig)
  ],
  declarations: [StepperPage]
})
export class StepperPageModule {}
