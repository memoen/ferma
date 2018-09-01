import { Component, OnInit } from '@angular/core';
import  {CellFactoryInfoService} from '../../service/cell-info.service';

import {getPlantInfoByName} from '../../service/fields-store.service';
import {getFactoryProductInfoByName } from '../../service/factory/factory-manage.service'
declare var alertify: any;


@Component({
  selector: 'app-factory-console',
  templateUrl: './factory-console.component.html',
  styleUrls: ['./factory-console.component.css']
})
export class FactoryConsoleComponent implements OnInit {

  factoryInfo;
  factoryInfoObj;


  outputProductSrc;
  outputProductQuantity;
  inputProductObj;
  delayTime;

  isFactoryWork:boolean = false;
  constructor(private FactoryInfoObj:CellFactoryInfoService) {
    this.factoryInfo = FactoryInfoObj.info;
    this.factoryInfoObj = FactoryInfoObj;


    this.delayTime = this.factoryInfo.currentFactory.basicDelay/1000;
    this.outputProductSrc = getFactoryProductInfoByName(this.factoryInfo.currentFactory.outputProduct).src;
    this.outputProductQuantity = this.factoryInfo.currentFactory.basicOutput;

    console.log(this.factoryInfo);
    this.inputProductObj = this.factoryInfo.currentFactory.inputProduct.map(item=>{
      return {
        src: getPlantInfoByName(item.item).src,
        quantity: item.quantity
      }

    })

  }

  ngOnInit() {

  }


  closeItem(){
    this.factoryInfoObj.hide();
  }




  ininProductWork(){
    this.isFactoryWork = true;
    var context = this;
     this.factoryInfo.initWork().then(()=>{
       context.isFactoryWork = false;
     });


  }

}
