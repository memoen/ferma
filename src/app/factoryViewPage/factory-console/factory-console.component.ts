import { Component, OnInit ,OnDestroy} from '@angular/core';
import  {CellFactoryInfoService} from '../../service/cell-info.service';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';



import {getPlantInfoByName} from '../../service/fields-store.service';
import {getFactoryProductInfoByName,getAllFactoryTypeInterfaceAsObj ,getAllGoodsInterfaceAsObj} from '../../service/factory/factory-manage.service'
declare var alertify: any;


@Component({
  selector: 'app-factory-console',
  templateUrl: './factory-console.component.html',
  styleUrls: ['./factory-console.component.css'],
  animations: [
    trigger('floatTip', [
      state('dead', style({
        left: '-90vw',
        opacity: 0,
      })),
      state('life',   style({
        opacity: 1,
        left: '5vw',
      })),
      transition('dead => life', animate('500ms ease-in')),
      transition('life => dead', animate('500ms ease-out'))
    ]),

  trigger('mask', [
    state('dead', style({
      left: '-90vw',
      opacity: 0,
    })),
    state('life',   style({
      opacity: 1,
      left: '5vw',
    })),
    transition('dead => life', animate('500ms ease-in')),
    transition('life => dead', animate('500ms ease-out'))
  ]),



],





})
export class FactoryConsoleComponent implements OnInit {

  factoryInfo;
  lifeStatus = 'dead';
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
      console.log(item);
     var srcObj =  getPlantInfoByName(item.item);
      var src;
     if (srcObj && srcObj.src){
       src = srcObj.src;
     } else{
        src =getAllGoodsInterfaceAsObj()[item.item].src;
        console.log(src);
      }
      return {
        src: src,
        quantity: item.quantity
      }

    })

  }

  ngOnInit() {
      this.lifeStatus = 'life';
  }


  closeItem(){
    this.lifeStatus ='dead';
    setTimeout(()=>{

    this.factoryInfoObj.hide();
    console.log('hide');
    }
      , 500);
  }




  ininProductWork(){
    this.isFactoryWork = true;
    var context = this;
     this.factoryInfo.initWork().then(()=>{
       context.isFactoryWork = false;
     });


  }




  ngOnDestroy(){

    console.log('here');

  }
}
