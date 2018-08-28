import { Component, OnInit, Input } from '@angular/core';

// import {CellInfoService} from


@Component({
  selector: 'app-cell-area',
  templateUrl: './cell-area.component.html',
  styleUrls: ['./cell-area.component.css']
})



export class CellAreaComponent implements OnInit {
@Input('field') currentField;

  cellOfField 
  constructor() { }

  ngOnInit() {
  	console.log(this.currentField);
 this.cellOfField = this.currentField.linearCellArr;
  	
  }

  

}
