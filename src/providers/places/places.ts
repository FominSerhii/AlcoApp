import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Place } from '../../models/place';
import { Location } from '../../models/location';

@Injectable()
export class PlacesProvider {

	private places: Place[] = [];

  constructor(public http: HttpClient) {
    console.log('Hello PlacesProvider Provider');
  }

  addPlace(title: string, 
  				 description: string, 
  				 location: Location, 
  				 imageUrl: string) {
  	const place = new Place(title, description, location, imageUrl);
  	this.places.push(place);
  }

  loadPlaces() {
  	return this.places.slice();
  }

}
