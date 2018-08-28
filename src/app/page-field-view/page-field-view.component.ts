import { Component, OnInit } from '@angular/core';
import {FieldsStoreService, Field} from '../service/fields-store.service';
 import {CellInfoService} from  '../service/cell-info.service';

@Component({
  selector: 'app-page-field-view',
  templateUrl: './page-field-view.component.html',
  styleUrls: ['./page-field-view.component.css']
})
export class PageFieldViewComponent implements OnInit {

	currentField:Field;
   cellInfo;
  constructor(private fieldStore:FieldsStoreService, private cellInfoWindow:CellInfoService) {
  	/// via get parrameter

  	var getPramFieldIndex:number = 0;
  	this.currentField = fieldStore.getFieldByIndex(getPramFieldIndex);
    this.cellInfo = cellInfoWindow;
  	

   }


  ngOnInit() {
  }

}
