import { Component } from '@angular/core';
import {FinalSaveService} from './service/saveChanges/final-save.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'farmer';

  constructor(private lastSave:FinalSaveService){
      console.log(lastSave.init);
  }
}
