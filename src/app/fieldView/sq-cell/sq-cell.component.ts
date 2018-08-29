import { Component, OnInit, Input ,Inject,ChangeDetectorRef,ApplicationRef} from '@angular/core';
import  {CellInfoService} from '../../service/cell-info.service';
import  {VieldViewStateService,ActionType} from '../../service/vield-view-state.service';
import { SelectedSeedService } from '../../service/selected-seed.service';
import {Subscription} from "rxjs";
import {DayTimer, Weather} from '../../service/fields-store.service';

@Component({
  selector: 'app-sq-cell',
  templateUrl: './sq-cell.component.html',
  styleUrls: ['./sq-cell.component.css']
})
export class SqCellComponent implements OnInit {
	@Input('cellInfo') cellObj;
	 cellInfoObj;
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
   let dayTimer = DayTimer.instance;

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
