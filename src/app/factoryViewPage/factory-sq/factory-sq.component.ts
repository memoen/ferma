import { Component, OnInit ,Input } from '@angular/core';
import {CellFactoryInfoService} from '../../service/cell-info.service';

@Component({
  selector: 'app-factory-sq',
  templateUrl: './factory-sq.component.html',
  styleUrls: ['./factory-sq.component.css']
})
export class FactorySqComponent implements OnInit {


  cellServices;
  @Input('cellInfo') cellInfo;
  constructor(private cellService:CellFactoryInfoService) {
    this.cellServices = cellService;
  }

  ngOnInit() {

  }


  click__cell(){
    this.cellServices.show(this.cellInfo);
  }

}
