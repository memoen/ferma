import { Component, OnInit } from '@angular/core';
import {FactoryFieldComponent} from '../factoryViewPage/factory-field/factory-field.component';
import {FactoryManageService} from  '../service/factory/factory-manage.service';

import {SideFilterComponent} from '../fieldView/side-filter/side-filter.component';




@Component({
  selector: 'app-factory-view-page',
  templateUrl: './factory-view-page.component.html',
  styleUrls: ['./factory-view-page.component.css']
})
export class FactoryViewPageComponent implements OnInit {
  currentField
  constructor(private CurrentField: FactoryManageService) {

    this.currentField = CurrentField.getFieldByIndex(0);
    console.log(this.currentField);


  }

  ngOnInit() {

  }




}
