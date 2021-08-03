import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Place } from 'src/app/model/place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  places: Place[];

  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.places = this.placesService.places;
  }
  onOpenMenu() {
    this.menuCtrl.toggle('m1');
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
  }

}
