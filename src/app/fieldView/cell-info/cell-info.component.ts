import { Component, OnInit } from '@angular/core';
import  {CellInfoService} from '../../service/cell-info.service';
import {animate, state, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-cell-info',
  templateUrl: './cell-info.component.html',
  styleUrls: ['./cell-info.component.css'],
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
      transition('dead <=> life', animate('300ms ease-in')),

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
      transition('dead <=> life', animate('300ms ease-in')),
    ]),



  ],

})
export class CellInfoComponent implements OnInit {

  lifeStatus = 'dead';
  constructor(private cellInfo:CellInfoService) { }
plantInfo;

  ngOnInit() {
  	console.log(this.cellInfo);
  	this.plantInfo = this.cellInfo.info;
  	this.lifeStatus = 'life';
  }

  closeItem(){
    this.lifeStatus ='dead';
    setTimeout(()=>{

        this.cellInfo.hide();
        console.log('hide');
      }
      , 500);

  }

}
