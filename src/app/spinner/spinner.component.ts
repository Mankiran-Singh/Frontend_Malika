import { Component } from '@angular/core';
import { SpinnerHandlerService } from '../services/interceptors/spinner-handler.service';
import {  MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  standalone:true,
  imports:[MatProgressSpinnerModule,CommonModule]
})
export class SpinnerComponent {
  spinnerActive: boolean = true;

  constructor(
    public spinnerHandler: SpinnerHandlerService
  ) {
    this.spinnerHandler.showSpinner.subscribe(this.showSpinner.bind(this));
  }

  showSpinner = (state: boolean): void => {
    this.spinnerActive = state;
  };
}
