import { Component } from '@angular/core';
import { Feature } from '../../interfaces/places';
import { MapService, PlacesService } from '../../services';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  public selectedId: string = '';

  constructor( 
              private placeServices: PlacesService,
              private mapService: MapService
              ) { }


  get isLoadingPlaces(): boolean{
    return this.placeServices.isLoadingPlaces;
  }

  get places(): Feature[]{
    return this.placeServices.places;
  }

  flyTo( place: Feature){
    this.selectedId = place.id;
    
    const [ lng, lat ]= place.center;
    this.mapService.flyTo([ lng, lat ])
  }

  getDirections(place: Feature){
    if( !this.placeServices.userLocation) throw Error('No hay userLocation');

    this.placeServices.deletePlaces();

    const start = this.placeServices.userLocation!;
    const end = place.center as [number, number];

    this.mapService.getRouteBetweenPoints(start, end);
  }
}
