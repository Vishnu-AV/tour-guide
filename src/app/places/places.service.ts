import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { PlaceLocation } from '../model/location.model';
import { Place } from '../model/place.model';

interface PlaceData {
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
  location: PlaceLocation;
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private pplace = new BehaviorSubject<Place[]>([]);
  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  get places() {
    return this.pplace.asObservable();
  }

  fetchPlaces() {
    return this.http.get<{ [key: string]: PlaceData }>('https://ionic-angular-course-edcc2-default-rtdb.firebaseio.com/offered-place.json')
      .pipe(map(resData => {
        const places = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            places.push(
              new Place(
                key,
                resData[key].title,
                resData[key].description,
                resData[key].imageUrl,
                resData[key].price,
                new Date(resData[key].availableFrom),
                new Date(resData[key].availableTo),
                resData[key].userId,
                resData[key].location
              )
            );
          }
        }
        return places;
      }),
        tap(places => {
          this.pplace.next(places);
        })
      );
  }

  getPlace(id: string) {
    // return this.places.pipe(take(1), map(places => ({ ...places.find(p => p.id === id) })));
    return this.http
      .get<PlaceData>(
        `https://ionic-angular-course-edcc2-default-rtdb.firebaseio.com/offered-place/${id}.json`
      )
      .pipe(
        map(placeData => {
          return new Place(
            id,
            placeData.title,
            placeData.description,
            placeData.imageUrl,
            placeData.price,
            new Date(placeData.availableFrom),
            new Date(placeData.availableTo),
            placeData.userId,
            placeData.location
          );
        })
      );
  }

  addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date, locData: PlaceLocation) {
    let generatedId: string;
    const newPlace: Place = {
      id: Math.random().toString(),
      title: title.toString(),
      description: description.toString(),
      imageUrl: 'https://static.toiimg.com/photo/45685972.cms',
      price: Number(price),
      availableFrom: dateFrom,
      availableTo: dateTo,
      userId: this.authService.userId,
      location: locData
    };
    return this.http.post<{ name: string }>('https://ionic-angular-course-edcc2-default-rtdb.firebaseio.com/offered-place.json',
      { ...newPlace, id: null })
      .pipe(switchMap(resData => {
        generatedId = resData.name;
        return this.places;
      }),
        take(1),
        tap(places => {
          newPlace.id = generatedId;
          this.pplace.next(places.concat(newPlace));
        })
      );
  }


  updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1),
      switchMap(places => {
        if (!places || places.length <= 0) {
          return this.fetchPlaces();
        } else {
          return of(places);
        }
      }),
      switchMap(places => {
        const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
        updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId,
          oldPlace.location
        );
        return this.http.put(
          `https://ionic-angular-course-edcc2-default-rtdb.firebaseio.com/offered-place/${placeId}.json`,
          { ...updatedPlaces[updatedPlaceIndex], id: null }
        );
      }),
      tap(() => {
        this.pplace.next(updatedPlaces);
      })
    );
  }
}
