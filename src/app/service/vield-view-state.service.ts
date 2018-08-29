import { Injectable } from '@angular/core';
import  {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VieldViewStateService {

  constructor() { }

  state:ActionType = ActionType.none;


 private guiFilter;

 public get GuiFilter(){

   return this.guiFilter;
 }
 public set GuiFilter(val){

 	this.guiFilter = val;


   this.setUpdate(val);
 }

public putWaterLevel = 10;





 subject = new Subject();


 public setUpdate(val){
   return this.subject.next(val);
 }

 public  getUpdate(){
   return this.subject.asObservable();
 }








	
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




@Injectable()
export class StorePageView{
  isSHowed = false;
  constructor(){

  }
}

