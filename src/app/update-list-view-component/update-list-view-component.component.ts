import { Component, OnInit } from '@angular/core';
import {UpdateTreeService} from '../service/updateService/update-tree.service';
@Component({
  selector: 'app-update-list-view-component',
  templateUrl: './update-list-view-component.component.html',
  styleUrls: ['./update-list-view-component.component.css']
})
export class UpdateListViewComponentComponent implements OnInit {

  updateList;
  initUpdateItem(item){

    item.levelUP();

  }
  constructor(private updateTree:UpdateTreeService) {


    this.updateList = updateTree.UpdateList;

  }


  ngOnInit() {
  }

}
