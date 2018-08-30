import { Component, OnInit } from '@angular/core';
import{TimeControllerService} from '../service/timeService/time-controller.service';
@Component({
  selector: 'app-force-time',
  templateUrl: './force-time.component.html',
  styleUrls: ['./force-time.component.css']
})
export class ForceTimeComponent implements OnInit {

  constructor(private timeController:TimeControllerService) {

  }

  ngOnInit() {

  }
  private currentSpeed = 1;

  set CurrentSpeed(val:number){
    this.currentSpeed = val;
    this.timeController.setSpeed(val);
  }
  get CurrentSpeed(){
    return this.currentSpeed;
  }


  setSpeed(val:number){
    this.CurrentSpeed = val;
  }

}
