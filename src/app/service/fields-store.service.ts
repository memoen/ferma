import {Injectable, Inject, Optional} from '@angular/core';
import {SelectedSeedService} from './selected-seed.service';
import {Subscription, Subject} from "rxjs";

@Injectable()
export class FieldsStoreService {

  private availableFields: Field[] = [new Field(4, 5)];

  public get AvailableFields() {
    return this.availableFields;
  }

  public getFieldByIndex(index: number): Field {
    return this.AvailableFields[index];
  }

  constructor() {
  }
}


@Injectable()
export class Market {
  public productPrice = { /// sell price;
    ground: 0,
    grass: 3,
    tomato: 10,
    onion: 100,

  };
  static instance;

  constructor() {
    Market.instance = this;
  }
}

new Market();


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


@Injectable()
export class DayTimer {
  deltaTick: number = 1000;
  dayTick = () => {
    this.setAction(new Weather(30, 2));

  }
  static instance: DayTimer

  constructor() {


    DayTimer.instance = this;
    setInterval(this.dayTick, this.deltaTick);

  }

  private subject = new Subject();

  public getAction() {
    return this.subject.asObservable();
  }

  private setAction(data) {
    this.subject.next(data)
  }

}

new DayTimer();


export class Weather {
  rain: number;
  temperature: number;

  constructor(t, rain) {
    this.temperature = t;
    this.rain = rain;
  }
}



class Storage {
  public storage = {


  };

  private  waterPrice = 1;
  private  digPrice =2;

  public  get WaterPrice(){
    return this.waterPrice;
  }
  public  get DigPrice(){
    return this.digPrice;
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


  private market = Market.instance;


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

  public  payByWater(litter: number){
    var currentWaterPrice = this.WaterPrice * litter;

    return new Promise((resolve,reject)=>{
      if (this.money < currentWaterPrice){
        reject(false);
      }
      else{
        this.money -= currentWaterPrice;
        resolve(true);
      }
    })


  }

  public  payByDig(){
    var currentPrice = this.DigPrice;
    return new Promise((resolve,reject)=>{
      if (this.money<currentPrice){
        reject(false);
      }
      else{
        this.money -= currentPrice;
        resolve(true);
      }
    })
  }










}

export const staticStorage = new Storage();






class FieldCell {

  waterLevel = 50;
  qualityLevel = 50;
  randI = Math.round(Math.random());
  currentPlant: Plant;
  dayTimer;
  index;
  subscripton: Subscription;

  constructor(i) {


    this.globalStorage = staticStorage;

    this.dayTimer = DayTimer.instance;


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

    this.currentPlant.addReadyStatus(growSpeed / growNeed * 100);

  }


  public putWater(ml: number) {

    ///87

    if (this.waterLevel  +ml> 100) {
      ml = 100 - this.waterLevel;
    }
    staticStorage.payByWater(ml).then(()=>{
    this.addWater(ml);

    },(err)=>{
      console.log(err);
      console.log('no more monney');
    });

  }


  private addWater(ml:number){
    if (this.waterLevel> 100) {
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
          console.log('no more money');
        }
      )
    }

  }

  globalStorage;

  public digPlant() {

    if (this.currentPlant.name !== 'ground'){
      staticStorage.payByDig().then(()=>{


    if (this.currentPlant.readyStatus === 100) {
      this.globalStorage.addToStorage({name: this.currentPlant.name, quantity: this.currentPlant.basicQuantity});
      this.currentPlant = new Plant(Plants.ground);

    } else {
      this.currentPlant = new Plant(Plants.ground);
    }
      },()=>{
        console.log('no more money');
      });

    }

  }


}


enum Plants {
  tomato = 'tomato',
  grass = 'grass',
  onion = 'onion',
  ground = 'ground'
}


export var getPlantTypeByName = {
  tomato: Plants.tomato,
  grass: Plants.grass,
  ground: Plants.ground,
  onion: Plants.onion

}
export var getPlantInfoByName = (name: string) => {

  return {
    src: PlantsSrc[name],
    name: name,
    price: PlantsObj[name].price,

  };
}


var PlantsSrc = {
  grass: '../assets/grass.png',
  ground: '../assets/ground.png',
  tomato: '../assets/tomato.png',
  onion: '../assets/onion.png',
}

var PlantsObj = {
  grass: {
    price: 2,
    growPeriod: 20,
    basicQuantity: 3,
    basicDeltaGrow: 1,
    text: ' Grass SeedGrass seed involves spreading and sprouting new grass from a bag of seed. It’s more cost-effective than laying sod, but unlike the instant gratification that sod provides, seed takes 5 to 30 days to grow—and can take years to fill in completely.'
  },
  tomato: {
    price: 5,

    growPeriod: 2,
    basicDeltaGrow: 1,
    basicQuantity: 3,
    text: '-Easy to grow  Produces abundant clusters of smallish, vibrant colored fruitGreat in garden salads'
  },
  ground: {
    growPeriod: 20,
    basicDeltaGrow: 0,
    price: 0,
    basicQuantity: 3,
    text: '-Easy to grow '
  },
  onion: {
    growPeriod: 30,
    basicDeltaGrow: 1,
    basicQuantity: 3,
    price: 80, text: '-Easy to grow, hard to eat '
  }
}


class Plant {
  name;
  readyStatus = 0;
  growPeriad;
  src;
  price;
  basicDeltaGrow;
  text;
  basicQuantity;
  public addReadyStatus = (delta) => {
    this.readyStatus += delta;
    if (this.readyStatus > 100) {
      this.readyStatus = 100;
    }
  }

  constructor(name: Plants) {

    this.name = name;
    this.src = PlantsSrc[name];
    this.price = PlantsObj[name].price;
    this.text = PlantsObj[name].text;
    this.growPeriad = PlantsObj[name].growPeriod;
    this.basicDeltaGrow = PlantsObj[name].basicDeltaGrow;
    this.basicQuantity = PlantsObj[name].basicQuantity;


  }
}
