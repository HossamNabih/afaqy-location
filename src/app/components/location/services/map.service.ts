import { Injectable } from '@angular/core';
import { coordinates } from '../data/coordinates.json'

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { 
  }

  get getUserLocations():any[]{
    return coordinates
  }
}
