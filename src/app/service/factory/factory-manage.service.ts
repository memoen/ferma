import { Injectable } from '@angular/core';
//import {} from '../fields-store.service';
declare var alertify: any;


import {getPlantTypeByName, staticStorage, marketPriceConfig} from '../fields-store.service';
import {SelectedSeedService} from '../selected-seed.service';

@Injectable({
  providedIn: 'root'
})
export class FactoryManageService {

  private availableFields: Field[] = [new Field(4, 5)];




  public get AvailableFields() {
    return this.availableFields;
  }



  public getFieldByIndex(index: number): Field {
    return this.AvailableFields[index];
  }



  constructor() {
    console.log('create');
  }
}



class Field{

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

const factorysSrc ={
  cowFactory: '../../assets/factory/cowFactory.png',
  beton: '../../assets/factory/beton.png',
  ketchupFactory: '../../assets/factory/ketchupFactory.png',
  cheeseFactory: '../../assets/factory/cheeseFactory.png',


};






const factoryRegister = {
  cowFactory: 'cowFactory',
  beton: 'beton',
  ketchupFactory: 'ketchupFactory',
  cheeseFactory: 'cheeseFactory',
}

enum goodsProduct {
  milk = 'milk',
  ketchup ='ketchup',
  cheese = 'cheese',

}

const outputGoodsRegister = {
  milk: {
    name: 'milk',
    price: marketPriceConfig.productPrice.milk,
    src: '../../assets/goods/milk.png',

  },
  ketchup: {
    name: 'ketchup',
    price: marketPriceConfig.productPrice.ketchup,
    src: '../../assets/goods/ketchup.png',

  },
  cheese: {
    name: 'cheese',
    price: marketPriceConfig.productPrice.cheese,
    src: '../../assets/goods/cheese.png',

  }
}



export  const getAllGoodsInterfaceAsObj = ()=>{

  var keys = Object.keys(outputGoodsRegister);
  console.log(keys);
  var  outputList = [];
  for (let i= 0; i< keys.length; i ++){

    let outItem = outputGoodsRegister[keys[i]];
    outItem.src = outputGoodsRegister[keys[i]].src;



    outputList[keys[i]] = outItem;
  }
  return outputList;

}





export  const allProduceItem :any= ()=>{
  var source1 =getPlantTypeByName;
  var source2= getAllGoodsInterfaceAsObj();


  var newMap  = {};

  var key1 = Object.keys(source1);
  var key2 = Object.keys(source2);

  for (let i =0; i < key1.length; i++) {
    newMap[key1[i]] = source1[key1[i]];
  }
  for (let i =0; i < key2.length; i++) {
    newMap[key2[i]] = source2[key2[i]].name;
  }
  console.log('ntoheunohunth------');
  console.log(newMap);
  return newMap;

}





const  factoryList = {
  cowFactory: {
    name: 'cowFactory',
    text: 'cow factory',
    price: 300,
    inputProduct: [{item: getPlantTypeByName.grass, quantity: 3} ],
    outputProduct: goodsProduct.milk,
    basicDelay: 5000,
    energyUse: 1000,

    basicOutput: 1,
  },

  beton: {
  name: 'beton',
    text: 'beton',
    price: 0,
    inputProduct:  [{item: getPlantTypeByName.grass, quantity: 0} ],
    outputProduct: goodsProduct.milk,
    basicDelay: 5000,
    energyUse: 0,

    basicOutput: 0,
},

  ketchupFactory: {
  name: 'ketchupFactory',
    text: 'ketchup factory',
    price: 100,
    inputProduct:  [{item: getPlantTypeByName.tomato, quantity: 4} ],
    outputProduct: goodsProduct.ketchup,
    basicDelay: 3000,
    energyUse: 2000,

    basicOutput: 1,
},cheeseFactory: {
  name: 'cheeseFactory',
    text: 'cheese factory',
    price: 100,
    inputProduct:  [{item: allProduceItem().milk, quantity: 1} ],
    outputProduct: goodsProduct.cheese,
    basicDelay: 3000,
    energyUse: 2000,

    basicOutput: 1,
},

}



export  const getAllFactoryTypeInterface = ()=>{

  var keys = Object.keys(factoryList);
  console.log(keys);
  var  outputList = [];
  for (let i= 0; i< keys.length; i ++){

    let outItem = factoryList[keys[i]];
    outItem.src = factorysSrc[keys[i]];



    outputList.push(outItem);
  }
  return outputList;

}


export  const getAllFactoryTypeInterfaceAsObj = ()=>{

  var keys = Object.keys(factoryList);
  console.log(keys);
  var  outputList = [];
  for (let i= 0; i< keys.length; i ++){

    let outItem = factoryList[keys[i]];
    outItem.src = factorysSrc[keys[i]];



    outputList[keys[i]] = outItem;
  }
  return outputList;

}









class FieldCell {
  index;
  currentFactory:Factory;
  globalStorageRef = staticStorage;

  initWork():Promise<any>{
      // check product
    // push to store
      //return
    return new Promise((resolve, reject) => {

    this.globalStorageRef.useItem(this.currentFactory.inputProduct).then(()=>{

      var  pushTostore = ()=>{
        this.globalStorageRef.pushItem(this.currentFactory.outputProduct, this.currentFactory.basicOutput)
        alertify.log('Done')
        resolve();
      }
      setTimeout(pushTostore, this.currentFactory.basicDelay);


    }, (item)=>{
      alertify.log('no more item :' + item);
      resolve() ;
    })

    })




  }


  setFactory(name){

    console.log(name);
    if (this.currentFactory.name ==='beton'){

        var price = factoryList[name].price;
      this.globalStorageRef.buyItem(price).then(()=>{

        this.currentFactory = new Factory(name);
      },()=>{
        alertify.log('no more money');
      })
    } else{
      alertify.log('used cell');
    }
  }


  destructFactory(){
    this.currentFactory = new Factory('beton');
  }

  constructor(i){

    this.index = i;
    this.currentFactory = new Factory(factoryRegister.beton);

  }

}

export var getFactoryProductInfoByName = (name: string) => {

    console.log(factorysSrc[name] , outputGoodsRegister[name].price );
  if (outputGoodsRegister[name] && outputGoodsRegister[name].price ) {

    return {
      src: outputGoodsRegister[name].src,
      name: name,

      price: outputGoodsRegister[name].price,

    };
  }else{
    return undefined;
  }
}

class Factory {

  name;
  src;
  price;
  inputProduct;
  outputProduct;
  basicDelay;
  energyUse;
  basicInput;
  basicOutput;


  constructor(factoryType:string){
    const factoryTypeId:string = factoryRegister[factoryType];
    const factoryConfig = factoryList[factoryTypeId];


    this.src = factorysSrc[factoryTypeId];
    this.name = factoryConfig.name;
    this.price = factoryConfig.price;

    this.inputProduct = factoryConfig.inputProduct;
    this.outputProduct = factoryConfig.outputProduct;
    this.basicDelay = factoryConfig.basicDelay;
    this.energyUse = factoryConfig.energyUse;
    this.basicInput = factoryConfig.basicInput;
    this.basicOutput = factoryConfig.basicOutput;


  }

}
