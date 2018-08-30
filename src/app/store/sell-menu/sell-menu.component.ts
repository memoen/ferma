import { Component, OnInit, Input ,EventEmitter , Output} from '@angular/core';
import {staticStorage} from '../../service/fields-store.service';

@Component({
  selector: 'app-sell-menu',
  templateUrl: './sell-menu.component.html',
  styleUrls: ['./sell-menu.component.css']
})
export class SellMenuComponent implements OnInit {

  constructor() { }
  Storage;
  @Output('end') eventEnd = new EventEmitter();
  ngOnInit() {
    this.Storage = staticStorage;

  }
  toSellQ = 0;


  get ToSellQ(){
    return this.toSellQ;
  }
  set ToSellQ(val:number){
    val = +val;
    if (val >this.sellProduct.quantity){
      val = this.sellProduct.quantity;
    }

    this.toSellQ = val;
  }
  @Input('productToSell') sellProduct;

  checkSellLimit(){
    this.toSellQ = +this.toSellQ;
  }

  sellAll(){
    this.toSellQ = this.sellProduct.quantity;
    this.confirmSell();
  }

  confirmSell(){

    this.Storage.sellProduct(this.sellProduct.name, this.toSellQ);
    this.closeSellWindow();

  }

  closeSellWindow(){
      console.log('close');
      this.eventEnd.emit();
  }


}
