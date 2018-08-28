import { Component, OnInit } from '@angular/core';
import  {VieldViewStateService,ActionType} from '../../service/vield-view-state.service';
import {getPlantInfoByName,getPlantTypeByName} from '../../service/fields-store.service';
import  {SelectedSeedService} from '../../service/selected-seed.service';
@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.css']
})
export class SideFilterComponent implements OnInit {

  constructor(private viewFieldState:VieldViewStateService,
    private selectedSeed:SelectedSeedService) { 


  }
  seedAtlas =[];
  ngOnInit() {
    var keys = Object.keys(getPlantTypeByName);
    for (var i = 0; i < keys.length; ++i) {
      
    this.seedAtlas.push(getPlantInfoByName(keys[i]));
    }
    console.log(this.selectedSeed);
  }

  setAction(type:string){
  	var action:ActionType;
  	if(this.viewFieldState.Status == type) {
  		action = ActionType.none;

  	}else if (type == 'plant') {
  		action = ActionType.plant;
  	}else if(type =='water'){
  		action = ActionType.water;

  	}else if(type =='dig'){
  		action = ActionType.dig;

  	}

  	this.viewFieldState.Status = action;

  }


  setActiveSeed(name:string){
    this.selectedSeed.setSeed(name);
  }
  test(a,b){
    console.log(a);
    console.log(b);
    return true;
  }

}
