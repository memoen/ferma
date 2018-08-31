import {Component, Input, OnInit} from '@angular/core';
import {CellAreaComponent} from  '../../fieldView/cell-area/cell-area.component';
@Component({
  selector: 'app-factory-field',
  templateUrl: './factory-field.component.html',
  styleUrls: ['./factory-field.component.css']
})
export class FactoryFieldComponent implements OnInit {
  @Input('field') currentField;

  cellOfField
  constructor() { }

  ngOnInit() {
    console.log(this.currentField);
    this.cellOfField = this.currentField.linearCellArr;

  }

}
