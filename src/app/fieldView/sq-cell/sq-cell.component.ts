import { Component, OnInit, Input } from '@angular/core';
import  {CellInfoService} from '../../service/cell-info.service';

@Component({
  selector: 'app-sq-cell',
  templateUrl: './sq-cell.component.html',
  styleUrls: ['./sq-cell.component.css']
})
export class SqCellComponent implements OnInit {
	@Input('cellInfo') cellObj;
  constructor(private cellInfo:CellInfoService) { }

  ngOnInit() {
  	
  }

  showInfoWindow(){
  	
  	this.cellInfo.show(this.cellObj);
  }

}
