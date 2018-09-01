import { Component, OnInit } from '@angular/core';
import {FactoryFieldComponent} from '../factoryViewPage/factory-field/factory-field.component';
import {FactoryManageService} from  '../service/factory/factory-manage.service';

import {SideFilterComponent} from '../fieldView/side-filter/side-filter.component';

import {FactoryConsoleComponent} from '../factoryViewPage/factory-console/factory-console.component';

import {CellFactoryInfoService} from '../service/cell-info.service';

@Component({
  selector: 'app-factory-view-page',
  templateUrl: './factory-view-page.component.html',
  styleUrls: ['./factory-view-page.component.css']
})
export class FactoryViewPageComponent implements OnInit {
  currentField;
  dialogControl;
  constructor(private CurrentField: FactoryManageService, private cellStatus:CellFactoryInfoService) {

    this.currentField = CurrentField.getFieldByIndex(0);
    console.log(this.currentField);
  this.dialogControl = cellStatus;

  }

  ngOnInit() {

  }




}
