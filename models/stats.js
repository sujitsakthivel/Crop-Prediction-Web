const db = require("../util/database");

module.exports = class Stat {
  constructor(id) {
    this.id = id;
  }

  save() {
    return db.execute("INSERT INTO STAT (id) VALUES(?)", [this.id]);
  }

  static update(id, plant) {
    switch (plant) {
      case "Wheat":
        return db.execute(
          "UPDATE STAT SET WHEAT = WHEAT + 1 WHERE STAT.ID = ?",
          [id]
        );
      case "Rice":
        return db.execute("UPDATE STAT SET Rice = Rice + 1 WHERE STAT.ID = ?", [
          id,
        ]);
      case "SoyaBeans":
        return db.execute(
          "UPDATE STAT SET SoyaBeans = SoyaBeans + 1 WHERE STAT.ID = ?",
          [id]
        );
      case "Sugarcane":
        return db.execute(
          "UPDATE STAT SET Sugarcane = Sugarcane + 1 WHERE STAT.ID = ?",
          [id]
        );
      case "Maize":
        return db.execute(
          "UPDATE STAT SET Maize = Maize + 1 WHERE STAT.ID = ?",
          [id]
        );
      case "Potato":
        return db.execute(
          "UPDATE STAT SET Potato = Potato + 1 WHERE STAT.ID = ?",
          [id]
        );
    }
  }

  static deleteById(id) {
    return db.execute("DELETE FROM STAT WHERE STAT.ID = ?", [id]);
  }

  static fetchAll() {
    // return db.execute(
    //   "SELECT SUM(RICE) AS Rice, SUM(WHEAT) AS Wheat, SUM(POTATO) AS Potato, SUM(SOYABEANS) AS SoyaBeans, SUM(MAIZE) AS Maize, SUM(SUGARCANE) AS Sugarcane FROM STAT"
    // );
    return db.execute("SELECT * FROM GET_ALL_STATS;");
  }

  static findById(id) {
    return db.execute("SELECT * FROM STAT WHERE STAT.ID = ?", [id]);
  }
};
