import { Injectable } from '@angular/core';
import {staticStorage} from '../fields-store.service';
@Injectable({
  providedIn: 'root'
})
export class UpdateTreeService {


  private  updateList = [new UpdateItem(staticStorage,'WaterPrice',0.8,100,10,'../assets/grass.png')];
  public  get UpdateList(){
    return this.updateList;
  }
  constructor() { }
}
let nextLevelMultipier =1.2;

class  UpdateItem{
  readonly text;

  private currentLevel:number = 1;
  public get CurrentLevel(){
    return this.currentLevel;
  }
  private maxLevel:number;
  readonly  baseUpdatePrice:number;
  readonly updateSrc;
  readonly pathToConfig;
  readonly configPathField;
  readonly updateEffectMultipier;
  readonly basicEffectValue;
  public get Price(){
    return Math.pow(nextLevelMultipier , this.currentLevel)*this.baseUpdatePrice;
  }

  public levelUP():boolean{

    if (this.CurrentLevel < this.maxLevel){


     staticStorage.buyItem(this.Price).then(()=>{
          this.currentLevel++;
       this.pathToConfig[this.configPathField] = Math.pow(this.updateEffectMultipier, this.currentLevel) * this.basicEffectValue;

    }, ()=>{
       console.log('no more money');
       //// init msg service;
     })

    } else{
      return false;
    }
  }

  constructor(pathToConfig, configPathField,updateEffectMultipier,baseUpdatePrice, maxLevel,updateSrc){
          this.pathToConfig = pathToConfig;
          this.updateEffectMultipier = updateEffectMultipier;
          this.baseUpdatePrice = baseUpdatePrice;
          this.configPathField = configPathField;
          this.basicEffectValue = Math.pow(pathToConfig[configPathField],this.currentLevel);
          this.updateSrc = updateSrc;
          this.maxLevel = maxLevel;



  }
}

