const db = require("../util/database");

module.exports = class Soil {
  constructor(soilId, type, c_amt, n_amt, p_amt, php_amt, ph_lvl, areaId) {
    this.soilId = soilId;
    this.type = type;
    this.c_amt = c_amt;
    this.n_amt = n_amt;
    this.p_amt = p_amt;
    this.php_amt = php_amt;
    this.ph_lvl = ph_lvl;
    this.areaId = areaId;
  }

  save() {
    return db.execute(
      "INSERT INTO SOIL (soilId, type, c_amt, n_amt, p_amt, php_amt, ph_lvl, areaId) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
      [
        this.soilId,
        this.type,
        this.c_amt,
        this.n_amt,
        this.p_amt,
        this.php_amt,
        this.ph_lvl,
        this.areaId,
      ]
    );
  }

  update() {
    return db.execute(
      "UPDATE SOIL SET type = ?, c_amt = ?, n_amt = ?, p_amt = ?, php_amt = ?, ph_lvl = ? WHERE SOIL.SOILID = ?",
      [
        this.type,
        this.c_amt,
        this.n_amt,
        this.p_amt,
        this.php_amt,
        this.ph_lvl,
        this.soilId,
      ]
    );
  }

  static deleteById(areaId) {
    return db.execute("DELETE FROM SOIL WHERE SOIL.AREAID = ?", [areaId]);
  }

  static fetchAll(userId) {
    return db.execute(
      "SELECT * FROM SOIL WHERE SOIL.AREAID = AREAS.ID AND AREAS.USERID = ?",
      [userId]
    );
  }

  static findByAreaId(id) {
    return db.execute("SELECT * FROM SOIL WHERE SOIL.AREAID = ?", [id]);
  }
};
