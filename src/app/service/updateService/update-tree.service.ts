import { Injectable } from '@angular/core';
import {staticStorage, plantObjUpdater} from '../fields-store.service';
@Injectable({
  providedIn: 'root'
})
export class UpdateTreeService {


  private  updateList = [
    new UpdateItem('waterPrice',staticStorage,'WaterPrice',0.9,
      100,10,'../assets/updates/water.png',  'Reduce water usage price'),
    new UpdateItem('DigPrice',staticStorage,'DigPrice',0.85,
      150,10,'../assets/updates/dig.png',  'Reduce dig  price usage'),

    new UpdateItem('grass',plantObjUpdater.fields.grass,'growPeriod',0.95,
      50,10,'../assets/updates/grass.png',  'Improve Grass ready speed'),
    new UpdateItem('grass',plantObjUpdater.fields.grass,'negativeEffectSensative',0.9,
      60,10,'../assets/updates/grass.png',  'Improve Grass health protect'),
    new UpdateItem('grass',plantObjUpdater.fields.grass,'basicQuantity',0.7,
      90,10,'../assets/updates/grass.png',  'Improve Grass harvest'),

    new UpdateItem('tomato',plantObjUpdater.fields.tomato,'growPeriod',0.95,
      150,10,'../assets/updates/tomato.png',  'Improve tomato ready speed'),
    new UpdateItem('tomato',plantObjUpdater.fields.tomato,'negativeEffectSensative',0.9,
      120,10,'../assets/updates/tomato.png',  'Improve tomato health protect'),
    new UpdateItem('tomato',plantObjUpdater.fields.tomato,'basicQuantity',0.7,
      140,10,'../assets/updates/tomato.png',  'Improve tomato harvest'),

    new UpdateItem('onion',plantObjUpdater.fields.onion,'growPeriod',0.95,
      250,10,'../assets/updates/onion.png',  'Improve onion ready speed'),
    new UpdateItem('onion',plantObjUpdater.fields.onion,'negativeEffectSensative',0.9,
      270,10,'../assets/updates/onion.png',  'Improve onion health protect'),
    new UpdateItem('onion',plantObjUpdater.fields.onion,'basicQuantity',0.7,
      290,10,'../assets/updates/onion.png',  'Improve onion harvest'),


  ];
  public  get UpdateList(){
    return this.updateList;
  }
  constructor() { }
}
let nextLevelMultipier =1.2;

class  UpdateItem{
  readonly text;

  private currentLevel:number = 0;
  public get CurrentLevel(){
    return this.currentLevel;
  }
  private maxLevel:number;
  readonly  baseUpdatePrice:number;
  readonly updateSrc;
  readonly nameSpace;
  readonly pathToConfig;
  readonly configPathField;
  readonly updateEffectMultipier;

  public  get DeltaEffectMultipier(){
    return this.updateEffectMultipier-1;
  }
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

  constructor(namespace, pathToConfig, configPathField,updateEffectMultipier,baseUpdatePrice, maxLevel,updateSrc, text){
          this.pathToConfig = pathToConfig;
          this.updateEffectMultipier = updateEffectMultipier;
          this.baseUpdatePrice = baseUpdatePrice;
          this.configPathField = configPathField;
          this.basicEffectValue = Math.pow(pathToConfig[configPathField],this.currentLevel);
          this.updateSrc = updateSrc;
          this.maxLevel = maxLevel;
          this.text = text;
          this.nameSpace = namespace;


  }
}

