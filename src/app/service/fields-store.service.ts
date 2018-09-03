import {Injectable, OnDestroy} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {dayTimerInstance, Weather} from "./timeService/time-controller.service";
declare var alertify: any;




@Injectable()
export class FieldsStoreService {

  private availableFields: Field[] = [new Field(14, 15)];




  public get AvailableFields() {
    return this.availableFields;
  }



  public getFieldByIndex(index: number): Field {
    return this.AvailableFields[index];
  }

  public toString(){
    return 'nthotuho';
  }

  constructor() {

  }
}



export class Market {
  public productPrice = { /// sell price;
    ground: 0,
    grass: 3,
    tomato: 10,
    onion: 100,
    pepper: 120,
    watermelon: 30,
    buckwheat: 40,
    milk: 10,
    drugs: 1000,
    ketchup: 100,
    cheese: 200,
    wheat: 45,
    rye: 55,
    strawberries: 70,
    raspberry: 60,
    potato: 60,



  };


  constructor() {

  }
}

export const  marketPriceConfig = new Market();


export class Field {

  width;
  height;

  linearCellArr: FieldCell[] = [];

  constructor(w, h) {
    this.width = w;
    this.height = h;

    var cellIndex = w * h;
    for (var i = 0; i < cellIndex; ++i) {
      this.linearCellArr.push(new FieldCell(i))
    }

  }
}


class Storage {
  public storage = {
    tomato: 5,
    grass: 8,
    pepper: 3,
    milk: 4,
    drugs: 1,
    ketchup: 1,
    cheese: 3,
    wheat: 1,
    rye: 4,
    strawberries: 3,
    raspberry: 12,
    potato:23,

  };




  public  useItem(itemList){
    return new Promise((resolve, reject)=>{
      var instock = true;
        for (let i = 0; i< itemList.length; i++){
          if (itemList[i].quantity > this.storage[itemList[i].item]){
            instock = false;
            reject( itemList[i].item);

          }
        }

      if (instock === true){

      for (let i = 0; i< itemList.length; i++){
        console.log(itemList[i].quantity);
        this.storage[itemList[i].item] -= itemList[i].quantity;

      }



        resolve();

      }
    })
  }


  public pushItem(itemName, quantity){
    // check store size

    this.storage[itemName] += quantity;
    console.log(this.storage);


  }
  private waterPrice = 1;

  public  set WaterPrice(value){
  this.waterPrice = value;
  }
  private digPrice = 2;

  public get WaterPrice() {
    return this.waterPrice;
  }

  public get DigPrice() {
    return this.digPrice;
  }

  public  set DigPrice(val){
    this.digPrice = val;
  }

  private money = 1000;

  public get MoneyBalance() {

    return this.money;
  }

  private get Money() {
    return this.money;
  }

  private set Money(money: number) {
    this.money = money;
    this.pushUpdate();

  }





  public subject = new Subject<any>();

  public pushUpdate() {

    this.subject.next(this.Money);

  }

  public getUpdate() {

    return this.subject.asObservable();
  }


  private market = marketPriceConfig;


  public buyProductSeed(seed) {
    return new Promise((resolve, reject) => {
      var price = this.market.productPrice[seed];

      if (price <= this.Money) {
        this.Money -= price;
        resolve(true);
      } else {

        reject(false);
      }
    })

  }

  public sellProduct(product, quantity: number): boolean {

    if (this.storage[product] >= quantity) {
      this.storage[product] -= quantity;
      this.money += quantity * this.market.productPrice[product];
      return true
    }
    return false;
  }


  public addToStorage(elem): boolean {
    if (!this.storage[elem.name]) {
      this.storage[elem.name] = 0;
    }
    this.storage[elem.name] += elem.quantity;

    return true;
  }


  constructor() {


  }

  public payByWater(litter: number) {
    var currentWaterPrice = this.WaterPrice * litter;

    return new Promise((resolve, reject) => {
      if (this.money < currentWaterPrice) {
        reject(false);
      }
      else {
        this.money -= currentWaterPrice;
        resolve(true);
      }
    })


  }

  public payByDig() {
    var currentPrice = this.DigPrice;
    return new Promise((resolve, reject) => {
      if (this.money < currentPrice) {
        reject(false);
      }
      else {
        this.money -= currentPrice;
        resolve(true);
      }
    })
  }


  public buyItem(price:number){
    return new Promise((resolve,reject)=>{
      if (this.Money<price){
        reject();
      }else{
        this.Money -= price;
        resolve(true);
      }

    })

  }


}

export const staticStorage = new Storage();


class FieldCell {

  waterLevel = 5;
  qualityLevel = 50;
  randI = Math.round(Math.random());
  currentPlant: Plant;
  dayTimer = dayTimerInstance;
  index;
  subscripton: Subscription;

  constructor(i) {


    this.globalStorage = staticStorage;


    this.index = i;

    var arg;

    if (this.randI === 0) {
      arg = Plants.grass
    } else {
      arg = Plants.tomato;
    }

    this.currentPlant = new Plant(arg);

    this.subscripton = this.dayTimer.getAction().subscribe((data: Weather) => {

      this.addGrows(data);
    });


  }


  addGrows(weather: Weather) {

    this.addWater(weather.rain);
    var growSpeed = this.currentPlant.basicDeltaGrow;
    var growNeed = this.currentPlant.growPeriad;


    if (this.waterLevel < this.currentPlant.basicWaterUsage) {
      //negative effect
      this.currentPlant.setNegativeEffect();
    } else {


      this.waterLevel -= this.currentPlant.basicWaterUsage;


      this.currentPlant.addReadyStatus(growSpeed / growNeed * 100);
    }


    //87

  }


  public putWater(ml: number) {

    ///87

    if (this.waterLevel + ml > 100) {
      ml = 100 - this.waterLevel;
    }
    staticStorage.payByWater(ml).then(() => {
      this.addWater(ml);

    }, (err) => {
      console.log(err);
      alertify.log('no more monney');
    });

  }


  private addWater(ml: number) {
    if (this.waterLevel > 100) {
      ml = 0;
      this.waterLevel = 100;
    }
    this.waterLevel += ml;

  }

  public setPlant(seed) {

    if (this.currentPlant.name == 'ground') {

      this.globalStorage.buyProductSeed(seed).then(
        () => {
          console.log('planted');

          this.currentPlant = new Plant(getPlantTypeByName[seed]);
        },
        (err) => {
          console.log(err);
          alertify.log('no more money');
        }
      )
    }

  }

  globalStorage;

  public digPlant() {

    if (this.currentPlant.name !== 'ground') {
      staticStorage.payByDig().then(() => {


        if (this.currentPlant.readyStatus === 100) {
          this.globalStorage.addToStorage({name: this.currentPlant.name, quantity: this.currentPlant.basicQuantity});
          this.currentPlant = new Plant(Plants.ground);

        } else {
          this.currentPlant = new Plant(Plants.ground);
        }
      }, () => {
        console.log('no more money');
      });

    }

  }


}


enum Plants {
  tomato = 'tomato',
  grass = 'grass',
  onion = 'onion',
  ground = 'ground',
  buckwheat = 'buckwheat',
  watermelon = 'watermelon',
  pepper = 'pepper',
  drugs = 'drugs',
  wheat = 'wheat',
  rye = 'rye',
  strawberries = 'strawberries',
  raspberry = 'raspberry',
  potato = 'potato',

}


export var getPlantTypeByName = {
  tomato: Plants.tomato,
  grass: Plants.grass,
  ground: Plants.ground,
  onion: Plants.onion,
  watermelon: Plants.watermelon,
  buckwheat: Plants.buckwheat,
  pepper: Plants.pepper,
  wheat: Plants.wheat,
  drugs: Plants.drugs,
  rye: Plants.rye,
  strawberries: Plants.strawberries,
  raspberry: Plants.raspberry,
  potato: Plants.potato,



};
export var getPlantInfoByName = (name: string) => {


  if (PlantsSrc[name] !== undefined && PlantsObj[name].price !== undefined ) {

  return {
    src: PlantsSrc[name],
    name: name,

    price: PlantsObj[name].price,

  };
  }else{
    return undefined;
  }
}


var PlantsSrc = {
  grass: '../assets/grass.png',
  ground: '../assets/ground.png',
  tomato: '../assets/tomato.png',
  onion: '../assets/onion.png',
  pepper: '../assets/pepper.png',
  watermelon: '../assets/watermelon.png',
  buckwheat: '../assets/buckwheat.png',
  deadPlant: '../assets/plantDead.png',
  drugs: '../assets/drugs.png',
  wheat: '../assets/wheat.png',
  rye: '../assets/rye.png',
  strawberries: '../assets/strawberries.png',
  raspberry: '../assets/raspberry.png',
  potato: '../assets/potato.png',

}


const PlantsObj = {
  grass: {
    price: marketPriceConfig.productPrice.grass,
    growPeriod: 20,
    negativeEffectSensative: 50,
    basicQuantity: 3,
    basicDeltaGrow: 1,
    bassicWaterUsage: 3,
    text: ' Grass SeedGrass seed involves spreading and sprouting new grass from a bag of seed. It’s more cost-effective than laying sod, but unlike the instant gratification that sod provides, seed takes 5 to 30 days to grow—and can take years to fill in completely.'
  },
  drugs: {
    price: marketPriceConfig.productPrice.drugs,
    growPeriod: 20,
    negativeEffectSensative: 10,
    basicQuantity: 3,
    basicDeltaGrow: 1,
    bassicWaterUsage: 3,
    text: ' Grass SeedGrass seed involves spreading and sprouting new grass from a bag of seed. It’s more cost-effective than laying sod, but unlike the instant gratification that sod provides, seed takes 5 to 30 days to grow—and can take years to fill in completely.'
  },
  tomato: {
    price: marketPriceConfig.productPrice.tomato,
    negativeEffectSensative: 5,
    growPeriod: 2,
    basicDeltaGrow: 1,
    bassicWaterUsage: 3,
    basicQuantity: 3,
    text: '-Easy to grow  Produces abundant clusters of smallish, vibrant colored fruitGreat in garden salads'
  },
  ground: {
    growPeriod: 1,
    basicDeltaGrow: 0,
    bassicWaterUsage: 1,
    price: marketPriceConfig.productPrice.ground,
    negativeEffectSensative: 0,
    basicQuantity: 3,
    text: '-Easy to grow '
  },
  onion: {
    growPeriod: 30,
    basicDeltaGrow: 1,
    bassicWaterUsage: 3,
    basicQuantity: 3,
    price: marketPriceConfig.productPrice.onion,
    negativeEffectSensative: 5,
    text: '-Easy to grow, hard to eat '
  },
  wheat: {
    growPeriod: 30,
    basicDeltaGrow: 1,
    bassicWaterUsage: 3,
    basicQuantity: 3,
    price: marketPriceConfig.productPrice.wheat,
    negativeEffectSensative: 5,
    text: '-Easy to grow, hard to eat '
  }, watermelon: {
    growPeriod: 30,
    basicDeltaGrow: 1,
    bassicWaterUsage: 3,
    basicQuantity: 3,
    price: marketPriceConfig.productPrice.watermelon,
    negativeEffectSensative: 5,
    text: 'Water and suggar '
  }, buckwheat: {
    growPeriod: 60,
    basicDeltaGrow: 1,
    bassicWaterUsage: 3,
    basicQuantity: 3,
    price: marketPriceConfig.productPrice.buckwheat,
    negativeEffectSensative: 5,
    text: '-Easy to grow, hard to eat '
  }, pepper: {
    growPeriod: 40,
    basicDeltaGrow: 1,
    basicQuantity: 3,
    bassicWaterUsage: 3,
    price: marketPriceConfig.productPrice.pepper,
    text: 'Too hot ',
    negativeEffectSensative: 5,
  },rye: {
    growPeriod: 40,
    basicDeltaGrow: 1,
    basicQuantity: 3,
    bassicWaterUsage: 3,
    price: marketPriceConfig.productPrice.rye,
    text: 'Too hot ',
    negativeEffectSensative: 5,
  },strawberries: {
    growPeriod: 40,
    basicDeltaGrow: 1,
    basicQuantity: 3,
    bassicWaterUsage: 3,
    price: marketPriceConfig.productPrice.strawberries,
    text: 'Too hot ',
    negativeEffectSensative: 5,
  },raspberry: {
    growPeriod: 40,
    basicDeltaGrow: 1,
    basicQuantity: 3,
    bassicWaterUsage: 3,
    price: marketPriceConfig.productPrice.raspberry,
    text: 'Too hot ',
    negativeEffectSensative: 5,
  },potato: {
    growPeriod: 40,
    basicDeltaGrow: 1,
    basicQuantity: 3,
    bassicWaterUsage: 3,
    price: marketPriceConfig.productPrice.potato,
    text: 'Too hot ',
    negativeEffectSensative: 5,
  },
}

class PlantObjUpdater{
  public  fields = PlantsObj;



}
export const plantObjUpdater = new PlantObjUpdater();



class Plant {
  private health: number = 100;

  public getHealth() {
    return this.health;
  }

  private get Health() {
    return this.health;
  }


  private set Health(value: number) {
    if (value > 100) {
      throw new Error('too big health');
    }

    this.health = value;
    if (this.health <= 0) {
      this.initDead();
    }
  }


  readonly name: string;
  private readyStat: number = 0;

  public get readyStatus() {
    return this.readyStat;
  }

  private set ReadyStatus(value: number) {
    if (value > 100) {
      value = 100
    }

    this.readyStat = value;
  }

  private get ReadyStatus() {
    return this.readyStat;
  }

  readonly growPeriad: number;
  private src: string;
  public get Src(){
    return this.src;
  };
  private setSrc(val:string){
    this.src = val;
  }


  readonly price: number;
  basicDeltaGrow: number;
  readonly text: string;
  readonly basicQuantity: number;
  readonly basicWaterUsage: number;
  private isAlive: boolean = true;

  public get IsAlive(){
    return this.isAlive;
  }

  readonly negativeEffectSensative: number;

  public addReadyStatus = (delta) => {
    if (this.isAlive) {
      this.ReadyStatus += delta;
    }
  }

  public setNegativeEffect = () => {
    if(this.isAlive){

    this.Health -= this.negativeEffectSensative;

    }
  }

  private initDead = () => {
    this.isAlive = false;
    this.ReadyStatus = 0;
    this.basicDeltaGrow = 0;
    this.setSrc(PlantsSrc.deadPlant);

  }


  constructor(name: Plants) {

    this.name = name;
    this.src = PlantsSrc[name];
    this.price = PlantsObj[name].price;
    this.text = PlantsObj[name].text;
    this.growPeriad = PlantsObj[name].growPeriod;
    this.basicDeltaGrow = PlantsObj[name].basicDeltaGrow;
    this.basicQuantity = PlantsObj[name].basicQuantity;
    this.basicWaterUsage = PlantsObj[name].bassicWaterUsage;
    this.negativeEffectSensative = PlantsObj[name].negativeEffectSensative;


  }
}
