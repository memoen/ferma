import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedSeedService {
 public seed = 'tomato';



 public setSeed(name){
 	this.seed = name;
 }
 public selectedFactory = 'beton';
 public get SelectedFactory(){
   return this.selectedFactory;
 }

 public setFactory(name){

   this.selectedFactory = name;
    console.log(this.selectedFactory);
 }


  constructor() {
  	
   }
}
