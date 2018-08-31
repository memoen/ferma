import { Component, OnInit ,Input } from '@angular/core';

@Component({
  selector: 'app-factory-sq',
  templateUrl: './factory-sq.component.html',
  styleUrls: ['./factory-sq.component.css']
})
export class FactorySqComponent implements OnInit {



  @Input('cellInfo') cellInfo;
  constructor() { }

  ngOnInit() {
  }

}
