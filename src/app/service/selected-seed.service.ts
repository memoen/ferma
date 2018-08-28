import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedSeedService {
 public seed = 'tomato';

 public setSeed(name){
 	this.seed = name;
 }


  constructor() {
  	
   }
}
