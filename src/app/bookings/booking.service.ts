import { Injectable } from '@angular/core';

import { Booking } from './booking.model';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private bbookings: Booking[] = [
      {
          id: 'xyz',
          placeId: 'p1',
          placeTitle: 'Kerala',
          guestNumber: 2,
          userId: 'user'
      }
  ];

  get bookings() {
    return [...this.bbookings];
  }
}
