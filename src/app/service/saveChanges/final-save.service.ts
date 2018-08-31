import { Injectable } from '@angular/core';
import {FieldsStoreService,staticStorage} from '../fields-store.service';
import {stringify} from "querystring";

@Injectable({
  providedIn: 'root'
})
export class FinalSaveService {

   stringifyX = (obj)=>{
    var cache = [];

    var rez = JSON.stringify(obj, function(key, value) {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return;
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    });
    cache = null;
    return rez;
  }
  constructor(private fieldList:FieldsStoreService) {



    window.addEventListener('beforeunload',()=>{


        localStorage.setItem('fieldList', this.stringifyX(this.fieldList));
        localStorage.setItem('storage', this.stringifyX(staticStorage));

    });
  }
  public init = true;
}
