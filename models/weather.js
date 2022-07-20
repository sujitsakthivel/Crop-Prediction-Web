const db = require("../util/database");

module.exports = class Weather {
  constructor(id, temperature, pressure, humidity, rainfall) {
    this.id = id;
    this.temperature = temperature;
    this.pressure = pressure;
    this.humidity = humidity;
    this.rainfall = rainfall;
  }

  save() {
    return db.execute(
      "INSERT INTO WEATHER (id, temperature, pressure, humidity, rainfall) VALUES(?, ?, ?, ?, ?)",
      [this.id, this.temperature, this.pressure, this.humidity, this.rainfall]
    );
  }

  static deleteById(id) {
    return db.execute("DELETE FROM WEATHER WHERE WEATHER.ID = ?", [id]);
  }

  static fetchAll() {
    return db.execute("SELECT * FROM WEATHER");
  }

  static findById(id) {
    return db.execute("SELECT * FROM WEATHER WHERE WEATHER.ID = ?", [id]);
  }
};
