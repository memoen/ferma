import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VieldViewStateService {

  constructor() { }

  state:ActionType = ActionType.none;

public putWaterLevel = 10;


 public set Status(name:ActionType){
 	this.state = name;
 }
 public get Status(){
 	
 	return this.state;
 }






}



export enum ActionType  {
	water  ='water',
	dig = 'dig',
	plant=  'plant',
	none = 'none'
};

