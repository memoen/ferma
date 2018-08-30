import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';

import {staticStorage,getPlantInfoByName} from '../../service/fields-store.service';
import {SellMenuComponent} from '../sell-menu/sell-menu.component';

@Component({
  selector: 'app-general-store-page',
  templateUrl: './general-store-page.component.html',
  styleUrls: ['./general-store-page.component.css']
})

export class GeneralStorePageComponent implements OnInit {

  changeDetector;
  constructor(private cdr:ChangeDetectorRef){
    this.changeDetector = cdr;
  }
  storeObj;
  myPlantArr;
  ngOnInit() {
    this.storeObj = staticStorage;



    this.myPlantArr = this.buildProductModel();


  }


  buildProductModel(){
    var keyPlant = Object.keys(this.storeObj.storage);
    var plantArr = [];
    for (let i =0; i<keyPlant.length; i++){
      plantArr[i] = getPlantInfoByName(keyPlant[i]);
      plantArr[i].quantity = this.storeObj.storage[keyPlant[i]] || 0;
    }
    return plantArr;
  }


  isShowedSellMenu = false;
  currentSellSelect;
  click__sellButton(item){
    this.currentSellSelect = item;
    this.isShowedSellMenu = true;
  }


  onEndSell(){

    this.isShowedSellMenu= false;
    this.currentSellSelect = null;
    this.changeDetector.detectChanges();
    this.myPlantArr = this.buildProductModel();

  }



  inStockMyPlantArr(){
    return this.myPlantArr.filter(item=>{
      return item.quantity >0;
    })
  }





}
