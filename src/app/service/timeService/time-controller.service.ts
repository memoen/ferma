import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TimeControllerService {

  private  speed;
  setSpeed(val:number){
    this.speed = val;
    this.dayTimer.DeltaTick = this.dayTimer.basicDeltaTick / this.speed;

  }
  dayTimer = dayTimerInstance;

  constructor() { }
}

export class Weather {
  rain: number;
  temperature: number;

  constructor(t, rain) {
    this.temperature = t;
    this.rain = rain;
  }
}

export class DayTimer {
  readonly basicDeltaTick:number = 1000;
  private  deltaTick: number = 1000;
  set DeltaTick(value:number){
    this.deltaTick = value;

    clearInterval(this.interval);
    
    this.interval  = this.initInterval();
  }
  get DeltaTick(){
    return this.deltaTick;
  }

  dayTick = () => {
    this.setAction(new Weather(4, 2));

  }

    initInterval = ()=>{
    if (this.deltaTick >0 && this.deltaTick < 10000) {

    return setInterval(this.dayTick, this.deltaTick);
    }
    }
    interval = this.initInterval();

  constructor() {


  }

  private subject = new Subject();

  public getAction() {
    return this.subject.asObservable();
  }

  private setAction(data) {
    this.subject.next(data)
  }

}

export const dayTimerInstance = new DayTimer();




