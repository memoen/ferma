import { Injectable } from '@angular/core';
//import {} from '../fields-store.service';
@Injectable({
  providedIn: 'root'
})
export class FactoryManageService {

  private availableFields: Field[] = [new Field(4, 5)];




  public get AvailableFields() {
    return this.availableFields;
  }



  public getFieldByIndex(index: number): Field {
    return this.AvailableFields[index];
  }



  constructor() {
    console.log('create');
  }
}



class Field{

  width;
  height;

  linearCellArr: FieldCell[] = [];

  constructor(w, h) {
    this.width = w;
    this.height = h;

    var cellIndex = w * h;
    for (var i = 0; i < cellIndex; ++i) {
      this.linearCellArr.push(new FieldCell(i))
    }

  }
}

class FieldCell {
  index;
  constructor(i){
    this.index = i;
  }

}
