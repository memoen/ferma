import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeedService {

  constructor() { }
  private money = 10;
  public deltaMoney(num){
    this.money +=num;
  }

}
