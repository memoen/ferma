import { Injectable } from '@angular/core';
//import {} from '../fields-store.service';
declare var alertify: any;


import {getPlantTypeByName, staticStorage, marketPriceConfig} from '../fields-store.service';
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

};






const factoryRegister = {
  cowFactory: 'cowFactory',
  beton: 'beton',
}

enum goodsProduct {
  milk = 'milk',

}

const outputGoodsRegister = {
  milk: {
    name: 'milk',
    price: marketPriceConfig.productPrice.milk,
    src: '../../assets/goods/milk.png',

  }
}





const  factoryList = {
  cowFactory: {
    name: 'cow factory',
    price: 300,
    inputProduct: [{item: getPlantTypeByName.grass, quantity: 3} ],
    outputProduct: goodsProduct.milk,
    basicDelay: 5000,
    energyUse: 1000,

    basicOutput: 1,
  },
  beton: {
  name: 'beton',
    price: 0,
    inputProduct: getPlantTypeByName.grass,
    outputProduct: goodsProduct.milk,
    basicDelay: 5000,
    energyUse: 0,
    basicInput: 0,
    basicOutput: 0,
},

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
  constructor(i){

    this.index = i;
    this.currentFactory = new Factory(factoryRegister.cowFactory);
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
