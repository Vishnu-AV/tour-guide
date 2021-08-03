import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Place } from 'src/app/model/place.model';

@Component({
  selector: 'app-crate-booking',
  templateUrl: './crate-booking.component.html',
  styleUrls: ['./crate-booking.component.scss'],
})
export class CrateBookingComponent implements OnInit {

  @Input() selectedPlace: Place;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }
  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
  onBookPlace() {
    this.modalCtrl.dismiss({ messgae: 'Booking request' }, 'confirm');
  }
}
