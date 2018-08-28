import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CellInfoService {

	private isActive = false;
	public GetStatus(){
		return this.isActive;
	}

	public info= {};

	public show(info){
		if (this.isActive == false) {

		this.info = info;
		this.isActive = true;
		}
	} 
	public hide(){
		if (this.isActive == true) {
		this.isActive = false;
		this.info = {};
	}
	}

  constructor() { }
}
