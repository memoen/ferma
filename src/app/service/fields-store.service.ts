import { Injectable } from '@angular/core';
import { SelectedSeedService } from './selected-seed.service';
@Injectable({
  providedIn: 'root'
})
export class FieldsStoreService {

  private availableFields: Field[] = [new Field(8, 9)];

  public get AvailableFields() {
    return this.availableFields;
  }

  public getFieldByIndex(index: number): Field {
    return this.AvailableFields[index];
  }
  constructor() {}
}

export class Field {

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

  waterLevel = 50;
  qualityLevel = 50;
  randI = Math.round(Math.random());
  currentPlant: Plant;
  index;
  constructor(i, ) {
    this.index = i;

    var arg;

    if (this.randI === 0) {
      arg = Plants.grass
    } else {
      arg = Plants.tomato;
    }

    this.currentPlant = new Plant(arg);
  }


  public putWater(ml: number) {
    this.waterLevel += ml;
    if (this.waterLevel > 100) {
      this.waterLevel = 100;
    }
    console.log('water puttet');
  }

  public setPlant(seed) {
  	console.log(this.currentPlant.name);
    if (this.currentPlant.name == 'ground') {
    	
    	console.log(seed);
      this.currentPlant = new Plant(getPlantTypeByName[seed]);
    }

  }
  public digPlant() {
    console.log('dig');
    if (this.currentPlant.readyStatus === 100) {
      // push to store
    } else {
      this.currentPlant = new Plant(Plants.ground);
    }
    console.log(this);

  }


   

}



   



enum Plants {
  tomato = 'tomato',
    grass = 'grass',
    onion = 'onion',
    ground = 'ground'
}


export var getPlantTypeByName ={
	tomato: Plants.tomato,
	grass: Plants.grass,
	ground: Plants.ground,
	onion: Plants.onion

}
export var getPlantInfoByName =(name:string)=>{
	
	return {src: PlantsSrc[name],
		name: name,
		price: PlantsObj[name].price,

	};
}



var PlantsSrc = {
  grass: '../assets/grass.png',
  ground: '../assets/ground.png',
  tomato: '../assets/tomato.png',
  onion: '../assets/onion.png',
}

var PlantsObj = {
  grass: { price: 2, text: ' Grass SeedGrass seed involves spreading and sprouting new grass from a bag of seed. It’s more cost-effective than laying sod, but unlike the instant gratification that sod provides, seed takes 5 to 30 days to grow—and can take years to fill in completely.' },
  tomato: { price: 45, text: '-Easy to grow  Produces abundant clusters of smallish, vibrant colored fruitGreat in garden salads' },
  ground: { price: 0, text: '-Easy to grow ' },
  onion: { price: 80, text: '-Easy to grow, hard to eat ' }
}


class Plant {
  name;
  readyStatus = 0;
  growPeriad = 50;
  src;
  price;
  text;
  constructor(name: Plants) {
  	
    this.name = name;
    this.src = PlantsSrc[name];
    this.price = PlantsObj[name].price;
    this.text = PlantsObj[name].text;
   



  }
}
