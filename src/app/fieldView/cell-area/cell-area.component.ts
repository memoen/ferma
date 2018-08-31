import { Component, OnInit, Input } from '@angular/core';
import {FactorySqComponent} from '../../factoryViewPage/factory-sq/factory-sq.component';
// import {CellInfoService} from


@Component({
  selector: 'app-cell-area',
  templateUrl: './cell-area.component.html',
  styleUrls: ['./cell-area.component.css']
})



export class CellAreaComponent implements OnInit {
@Input('field') currentField;
@Input('mode') mode;

  cellOfField 
  constructor() { }

  ngOnInit() {
  	console.log(this.mode);
 this.cellOfField = this.currentField.linearCellArr;
  	
  }

  

}
