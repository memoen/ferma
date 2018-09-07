import { Component, OnInit, Input ,Inject,ChangeDetectorRef,ApplicationRef} from '@angular/core';
import  {CellInfoService} from '../../service/cell-info.service';
import  {VieldViewStateService,ActionType} from '../../service/vield-view-state.service';
import { SelectedSeedService } from '../../service/selected-seed.service';
import {Subscription} from "rxjs";
import {Weather} from '../../service/timeService/time-controller.service';
import {dayTimerInstance} from "../../service/timeService/time-controller.service";

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-sq-cell',
  templateUrl: './sq-cell.component.html',
  styleUrls: ['./sq-cell.component.css'],
  animations: [
    trigger('blink', [
      state('none', style({
        opacity: 1,
        transform: 'scale(1)',

      })),
      state('active',   style({

        opacity: 0.9,
        transform: 'scale(1.2)'
      })),
      transition('none <=> active', animate('300ms ease-in')),
      //transition('active => none', animate('600ms ease-out'))
    ])
  ]
})
export class SqCellComponent implements OnInit {
	@Input('cellInfo') cellObj;
	 cellInfoObj;
  statusChangeView = 'none';


  constructor(private cellInfo:CellInfoService, 
  private fieldState:VieldViewStateService,private currentSeed:SelectedSeedService,
              private cdf:ChangeDetectorRef,
              private aref:ApplicationRef,
              ) {
    this.cellInfoObj = cellInfo;
  }



    guiFilterType ='none';


  subscription: Subscription;
  subscripton: Subscription;


  updateModel(){


    this.cdf.detectChanges();


  }




  ngOnDestroy(){
    this.cdf = null;
    this.subscription.unsubscribe();
    this.subscripton.unsubscribe();

  }

  ngOnInit() {
   let context = this;
   let dayTimer = dayTimerInstance;

    this.subscripton = dayTimer.getAction().subscribe((data: Weather) => {
      this.updateModel();
    });

    this.subscription = this.fieldState.getUpdate().subscribe((data:string)=>{

      context.guiFilterType = data;
    })
  }




  showInfoWindow(){
  	
  	this.cellInfo.show(this.cellObj);
  }

  putWater(){
    
    this.cellObj.putWater(this.fieldState.putWaterLevel);
    
  }
  dig(){
    this.cellObj.digPlant();
  }

  plant(){

    this.cellObj.setPlant(this.currentSeed.seed);
  }





  click__cell(){
    var state = this.fieldState.Status;
  this.statusChangeView = 'active';

  setTimeout(()=>{
  this.statusChangeView = 'none';

  },300);
    if (state === 'none') {
      this.showInfoWindow();

     }else if(state == 'water'){
       this.putWater();
     }else if(state == 'dig'){
       this.dig();
     }else if(state == 'plant'){
       this.plant();
     }

  }










}
