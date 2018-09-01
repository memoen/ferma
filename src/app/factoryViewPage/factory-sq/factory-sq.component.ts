import { Component, OnInit ,Input } from '@angular/core';
import {CellFactoryInfoService} from '../../service/cell-info.service';

import  {VieldViewStateService,ActionType} from '../../service/vield-view-state.service';
import {SelectedSeedService} from '../../service/selected-seed.service';

@Component({
  selector: 'app-factory-sq',
  templateUrl: './factory-sq.component.html',
  styleUrls: ['./factory-sq.component.css']
})
export class FactorySqComponent implements OnInit {


  cellServices;
  fieldStateInfo;
  factoryToSet;
  @Input('cellInfo') cellInfo;
  constructor(private cellService:CellFactoryInfoService, private fieldState:VieldViewStateService,
              private selectedSeed:SelectedSeedService) {

    this.cellServices = cellService;
    this.fieldStateInfo = fieldState;
    this.factoryToSet = selectedSeed;
  }

  ngOnInit() {
    console.log(this.fieldStateInfo);

  }


  click__cell(){
    if (this.fieldStateInfo.state == 'none') {

    this.cellServices.show(this.cellInfo);
    }else if(this.fieldStateInfo.state == 'plant'){


      this.cellInfo.setFactory(this.factoryToSet.SelectedFactory);
    }else if(this.fieldStateInfo.state == 'dig'){
      this.cellInfo.destructFactory();
    }
  }

}
