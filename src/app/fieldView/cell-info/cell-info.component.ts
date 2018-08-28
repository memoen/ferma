import { Component, OnInit } from '@angular/core';
import  {CellInfoService} from '../../service/cell-info.service';



@Component({
  selector: 'app-cell-info',
  templateUrl: './cell-info.component.html',
  styleUrls: ['./cell-info.component.css']
})
export class CellInfoComponent implements OnInit {

  constructor(private cellInfo:CellInfoService) { }
plantInfo;

  ngOnInit() {
  	console.log(this.cellInfo);
  	this.plantInfo = this.cellInfo.info;
  }

  closeItem(){
  	this.cellInfo.hide();
  }

}
