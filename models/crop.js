const db = require("../util/database");

module.exports = class Crop {
  constructor(
    id,
    name,
    type,
    c_req,
    n_req,
    p_req,
    php_req,
    ph_req,
    temp_req,
    water_req
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.c_req = c_req;
    this.n_req = n_req;
    this.p_req = p_req;
    this.php_req = php_req;
    this.ph_req = ph_req;
    this.temp_req = temp_req;
    this.water_req = water_req;
  }

  // save() {
  //   return db.execute(
  //     "INSERT INTO CROPS (id, name, imgurl, pincode) VALUES(?, ?, ?, ?)",
  //     [this.id, this.name, this.imgurl, this.pincode]
  //   );
  // }

  // update() {
  //   return db.execute(
  //     "UPDATE CROPS SET imgurl = ?, pincode = ? WHERE CROPS.ID = ?",
  //     [this.imgurl, this.pincode, this.id]
  //   );
  // }

  // static deleteById(id) {
  //   return db.execute("DELETE FROM CROPS WHERE CROPS.ID = ?", [id]);
  // }

  static fetchAll() {
    return db.execute("SELECT * FROM CROPS");
  }

  static findBySoilProps(c_amt, n_amt, p_amt, php_amt, ph_lvl, temp) {
    /*return db.execute(
      "SELECT * FROM CROPS WHERE (? BETWEEN C_REQ - 5 AND C_REQ + 5) AND (? BETWEEN N_REQ - 5 AND N_REQ + 5) AND (? BETWEEN P_REQ - 5 AND P_REQ + 5) AND (? BETWEEN PHP_REQ - 5 AND PHP_REQ + 5) AND (? BETWEEN PH_REQ - 1 AND PH_REQ + 1) AND (? BETWEEN TEMP_REQ - 5 AND TEMP_REQ - 5)",
      [c_amt, n_amt, p_amt, php_amt, ph_lvl, temp]
    );*/
    return db.execute(
      "SELECT id, name, ROUND(ABS(?-C_REQ) + ABS(?-N_REQ) + ABS(?-P_REQ) + ABS(?-PHP_REQ) + ABS(?-PH_REQ), 2) AS INCOMPATIBILITY FROM CROPS WHERE ID IN (SELECT ID FROM CROPS WHERE (? BETWEEN C_REQ - 5 AND C_REQ + 5) AND (? BETWEEN N_REQ - 5 AND N_REQ + 5) AND (? BETWEEN P_REQ - 5 AND P_REQ + 5) AND (? BETWEEN PHP_REQ - 5 AND PHP_REQ + 5) AND (? BETWEEN PH_REQ - 1 AND PH_REQ + 1) AND (? BETWEEN TEMP_REQ - 5 AND TEMP_REQ + 5)) ORDER BY INCOMPATIBILITY",
      [
        c_amt,
        n_amt,
        p_amt,
        php_amt,
        ph_lvl,
        c_amt,
        n_amt,
        p_amt,
        php_amt,
        ph_lvl,
        temp,
      ]
    );
  }
};
