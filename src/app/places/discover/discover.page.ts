import { Component, OnDestroy, OnInit } from '@angular/core';
import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Place } from 'src/app/model/place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  places: Place[];
  isLoading: boolean;
  relevantPlaces: Place[];
  private placeSub: Subscription;

  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController,
    private authService: AuthService,
    private smsRetriever: SmsRetriever
  ) {
    this.isLoading = false;
  }

  ngOnInit() {
    this.placeSub = this.placesService.places.subscribe(places => {
      this.places = places;
      this.relevantPlaces = places;
    });
    this.getSMS();
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }

  onOpenMenu() {
    this.menuCtrl.toggle('m1');
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === 'all') {
      this.relevantPlaces = this.places;
    } else {
      this.relevantPlaces = this.places.filter(
        place => place.userId !== this.authService.userId
      );
    }
  }

  getSMS() {
    this.smsRetriever.getAppHash()
      .then((res: any) => {
        console.log(res);
      })
      .catch((error: any) => console.error(error));
    this.smsRetriever.startWatching()
      .then((res: any) => {
        window.alert(res);
        console.log(res);
      })
      .catch((error: any) => console.error(error));
  }
  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
