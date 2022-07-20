const db = require("../util/database");

module.exports = class User {
  constructor(id, name, password, dob, phoneNumber) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.dob = dob;
    this.phoneNumber = phoneNumber;
  }

  save() {
    return db.execute(
      "INSERT INTO USER (id, name, password, dob, phone_num) VALUES(?, ?, ?, ?, ?)",
      [this.id, this.name, this.password, this.dob, this.phoneNumber]
    );
  }

  // update() {
  //   return db.execute(
  //     "UPDATE STAT SET imgurl = ?, pincode = ? WHERE STAT.ID = ?",
  //     [this.imgurl, this.pincode, this.id]
  //   );
  // }

  // static deleteById(id) {
  //   return db.execute("DELETE FROM STAT WHERE STAT.ID = ?", [id]);
  // }

  static fetchAll() {
    return db.execute("SELECT * FROM USER");
  }

  static findById(id, password) {
    return db.execute(
      "SELECT * FROM USER WHERE USER.ID = ? AND USER.PASSWORD = ?",
      [id, password]
    );
  }
};
