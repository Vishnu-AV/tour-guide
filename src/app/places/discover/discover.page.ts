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
  hash: any;
  sms: any;
  private placeSub: Subscription;

  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController,
    private authService: AuthService,
    private smsRetriever: SmsRetriever
  ) {
    this.isLoading = false;
    this.sms = 'Not recieved yet';
  }

  ngOnInit() {
    this.placeSub = this.placesService.places.subscribe(places => {
      this.places = places;
      this.relevantPlaces = places;
    });
    this.genHash();
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
  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
  genHash() {
    // This function is to get hash string of APP.
    // * @return {Promise<string>} Returns a promise that resolves when successfully generate hash of APP.
    this.smsRetriever.getAppHash()
      .then((res: any) => {
        console.log(res);
        alert(res);
        this.hash = res;
        console.log('retrieve started');
        this.retriveSMS();
      })
      .catch((error: any) => console.error(error));
  }


  retriveSMS() {
    console.log('Watching SMS');
    this.smsRetriever.startWatching()
      .then((res: any) => {
        console.log(res);
        this.sms = res.Message;
        //  <#> 323741 is your 6 digit OTP for MyApp. LDQEGVDEvcl
        const otp = res.Message.toString().substr(4, 6);
        alert(`OTP Received - ${otp}`);
      })
      .catch((error: any) => console.error(error));
  }
}
