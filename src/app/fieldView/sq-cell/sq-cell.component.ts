import { Component, OnInit, Input } from '@angular/core';
import  {CellInfoService} from '../../service/cell-info.service';
import  {VieldViewStateService,ActionType} from '../../service/vield-view-state.service';
import { SelectedSeedService } from '../../service/selected-seed.service';
@Component({
  selector: 'app-sq-cell',
  templateUrl: './sq-cell.component.html',
  styleUrls: ['./sq-cell.component.css']
})
export class SqCellComponent implements OnInit {
	@Input('cellInfo') cellObj;
  constructor(private cellInfo:CellInfoService, 
    private fieldState:VieldViewStateService,private currentSeed:SelectedSeedService) { }

  ngOnInit() {
  	
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
    console.log(this.currentSeed.seed);
    this.cellObj.setPlant(this.currentSeed.seed);
  }





  click__cell(){
    var state = this.fieldState.Status;
    console.log(state);
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
