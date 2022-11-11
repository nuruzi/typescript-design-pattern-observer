import './style.css';

const appDiv: HTMLElement = document.getElementById('app'); appDiv.innerHTML = `<h2>Observer Pattern<h2/>`;

// =============== Observer Pattern ===============

interface Subject {
  registerObserver(o: Observer);
  removeObserver(o: Observer);
  notifyObservers();
}

interface Observer {
  update(temperature: number);
}

class WeatherStation implements Subject {
  private temperature: number;
  private observers: Observer[] = [];

  setTemperature(temp: number) {
    console.log("WeatherStation: new temperature measurement: " + temp);
    appDiv.innerHTML += `<h4>WeatherStation: new temperature measurement: ${temp}</h4>`;

    this.temperature = temp;
    this.notifyObservers();
  }

  public registerObserver(o: Observer) {
    this.observers.push(o);
  }

  public removeObserver(o: Observer) {
    let index = this.observers.indexOf(o);
    this.observers.splice(index, 1);
  }

  public notifyObservers() {
    for (let observer of this.observers)
      observer.update(this.temperature);
  }

}

class TemperatureDisplay implements Observer {
  private subject: Subject;

  constructor(weatherStation: Subject) {
    this.subject = weatherStation;
    weatherStation.registerObserver(this);
  }

  public update(temperature: number) {
    console.log("TemperatureDisplay: I need to update my display.");
    appDiv.innerHTML += `<h4>TemperatureDisplay: I need to update my display.</h4>`;

    //Logic would go here.
  }
}

class Fan implements Observer {
  private subject: Subject;

  constructor(weatherStation: Subject) {
    this.subject = weatherStation;
    weatherStation.registerObserver(this);
  }

  public update(temperature: number) {
    if (temperature > 25) {
      console.log("Fan: its hot here, turning myself on..");
    appDiv.innerHTML += `<h4>Fan: its hot here, turning myself on..</h4>`;

      //Some real logic here.
    }
    else {
      console.log("Fan: its nice and cool, turning myself off");
    appDiv.innerHTML += `<h4>Fan: its nice and cool, turning myself off</h4>`;
      //Some real logic here.
    }
  }
}

let weatherStation = new WeatherStation();
let tempDisplay = new TemperatureDisplay(weatherStation);
let fan = new Fan(weatherStation);

weatherStation.setTemperature(20);
weatherStation.setTemperature(30);