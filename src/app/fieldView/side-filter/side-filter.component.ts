import {Component, OnInit, ChangeDetectorRef, SimpleChange, OnChanges,ApplicationRef, Input} from '@angular/core';
import {Subscription} from 'rxjs';
import { FormsModule }   from '@angular/forms';
import  {VieldViewStateService,ActionType} from '../../service/vield-view-state.service';
import {getPlantInfoByName,getPlantTypeByName,staticStorage} from '../../service/fields-store.service';
import  {SelectedSeedService} from '../../service/selected-seed.service';
import {ForceTimeComponent} from '../../force-time/force-time.component';




@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.css']
})
export class SideFilterComponent implements OnInit {

  @Input('mode') mode;

  activeTab;
  Storage;

  moneyUpdateSubscribe:Subscription;




  constructor(private viewFieldState:VieldViewStateService,
    private selectedSeed:SelectedSeedService,

              private gdr:ChangeDetectorRef,
              private aref:ApplicationRef,

              ) {



  this.activeTab = viewFieldState;
  var context = this;

    this.Storage = staticStorage


  }
  seedAtlas =[];


  ngOnInit() {
    var keys = Object.keys(getPlantTypeByName);
    console.log(keys);
    for (var i = 0; i < keys.length; ++i) {
      
    this.seedAtlas.push(getPlantInfoByName(keys[i]));
    }

    console.log(this.seedAtlas);


    this.moneyUpdateSubscribe =  this.Storage.getUpdate().subscribe((money)=>{

      console.log(money);
     this.refreshModel();
    })





  }
  moneyBalance;
  refreshModel(){

    this.moneyBalance = this.Storage.MoneyBalance ;


  }



clearMaskGlobal(){
  this.viewFieldState.GuiFilter = 'none';
  this.localFilter.dig = false;
  this.localFilter.water = false;
  this.localFilter.plant = false;
}


  setAction(type:string){
  	var action:ActionType;
  	if(this.viewFieldState.Status == type) {
  		action = ActionType.none;
      this.clearMaskGlobal();

  	}else if (type == 'plant') {
  		action = ActionType.plant;
      this.clearMaskGlobal();
  	}else if(type =='water'){
  		action = ActionType.water;
      this.clearMaskGlobal();

  	}else if(type =='dig'){
  		action = ActionType.dig;
      this.clearMaskGlobal();

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
