import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FieldsStoreService {

	private availableFields:Field[] =[ new Field(14,15)];

	public get AvailableFields(){
		return this.availableFields;
	}

	public getFieldByIndex(index:number):Field{
		return this.AvailableFields[index];
	}
  constructor() { }
}

export class Field  {
	
	width;
	height;

	linearCellArr:FieldCell[] = [];

	constructor(w,h) {
		this.width = w;
		this.height = h;

		var cellIndex = w*h;
		for (var i = 0; i < cellIndex; ++i) {
			this.linearCellArr.push(new FieldCell(i))
		}

	}
}



class FieldCell  {
	
	waterLevel= 50;
	qualityLevel = 50;
	 randI = Math.round(Math.random());
	currentPlant:Plant ;
index;
	constructor(i) {
		this.index = i;

		var arg;

		if (this.randI===0) {
			arg = Plants.grass
		}else{
			arg = Plants.tomato;
		}

		this.currentPlant = new Plant(arg);
	}
}
enum Plants {
	tomato ='tomato',
	grass ='grass',
}

var PlantsSrc = {
	grass: '../assets/grass.png',
	tomato: '../assets/tomato.png'
}


class Plant {
	name;
	readyStatus = 0;
	growPeriad = 50;
	src;
	constructor(name:Plants) {
		this.name = name;
		this.src = PlantsSrc[name];
		console.log(this.src);



	}
}