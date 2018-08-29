import {Component, OnInit, ChangeDetectorRef, SimpleChange, OnChanges,ApplicationRef} from '@angular/core';
import {Subscription} from 'rxjs';
import { FormsModule }   from '@angular/forms';
import  {VieldViewStateService,ActionType} from '../../service/vield-view-state.service';
import {getPlantInfoByName,getPlantTypeByName, Storage} from '../../service/fields-store.service';
import  {SelectedSeedService} from '../../service/selected-seed.service';

@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.css']
})
export class SideFilterComponent implements OnChanges {


  activeTab;
  storage;

  moneyUpdateSubscribe:Subscription;
  constructor(private viewFieldState:VieldViewStateService,
    private selectedSeed:SelectedSeedService,

              private gdr:ChangeDetectorRef,
              private aref:ApplicationRef,
              private  storages:Storage,
              ) {

    this.storage = storages;
    console.log(storages);
  this.activeTab = viewFieldState;
  var context = this;




  }
  seedAtlas =[];


  ngOnInit() {
    var keys = Object.keys(getPlantTypeByName);
    for (var i = 0; i < keys.length; ++i) {
      
    this.seedAtlas.push(getPlantInfoByName(keys[i]));
    }


    this.moneyUpdateSubscribe =  this.storage.getUpdate().subscribe((money)=>{


     this.refreshModel();
    })
    console.log(this.moneyUpdateSubscribe);




  }
  moneyBalance;
  refreshModel(){

    this.moneyBalance = this.storage.MoneyBalance ;
    console.log(this.storage);

  }




  ngOnChanges(){
    console.log('3');
  }
a;
  ngDoCheck(){
    console.log(8);
    this.a +=8;
  }

  setAction(type:string){
  	var action:ActionType;
  	if(this.viewFieldState.Status == type) {
  		action = ActionType.none;
      this.viewFieldState.GuiFilter = 'none';
      this.localFilter.dig = false;
      this.localFilter.water = false;
      this.localFilter.plant = false;

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


localFilter ={ // gui
  dig: false,
  water: false,
  plant: false,
}

  click__DigBox(){
    
    this.localFilter.dig = !this.localFilter.dig;

    if (this.localFilter.dig === true) {
      this.localFilter.water = false;
      this.localFilter.plant = false;
    this.viewFieldState.GuiFilter = 'dig';
    }else{
      this.viewFieldState.GuiFilter = 'none';
      this.localFilter.dig = false;
      this.localFilter.water = false;
      this.localFilter.plant = false;

    }
  }

  click__WaterBox(){
    this.localFilter.water = !this.localFilter.water;

    if (this.localFilter.water === true) {
      this.localFilter.dig = false;
      this.localFilter.plant = false;
    this.viewFieldState.GuiFilter = 'water';
    }else{
      this.viewFieldState.GuiFilter = 'none';
      this.localFilter.dig = false;
      this.localFilter.water = false;
      this.localFilter.plant = false;

    }
  }



  isShowStore = false;
  showStore(){
    this.isShowStore = true;
  }

}
