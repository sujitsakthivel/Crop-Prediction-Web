const db = require("../util/database");

module.exports = class Area {
  constructor(id, name, imgurl, pincode, userId) {
    this.id = id;
    this.name = name;
    this.imgurl = imgurl;
    this.pincode = pincode;
    this.userId = userId;
  }

  save() {
    return db.execute(
      "INSERT INTO AREAS (id, name, imgurl, pincode, userId) VALUES(?, ?, ?, ?, ?)",
      [this.id, this.name, this.imgurl, this.pincode, this.userId]
    );
  }

  update() {
    return db.execute(
      "UPDATE AREAS SET imgurl = ?, pincode = ? WHERE AREAS.ID = ?",
      [this.imgurl, this.pincode, this.id]
    );
  }

  static deleteById(id) {
    return db.execute("DELETE FROM AREAS WHERE AREAS.ID = ?", [id]);
  }

  static fetchAll() {
    return db.execute("SELECT * FROM AREAS");
  }

  static findById(id) {
    return db.execute("SELECT * FROM AREAS WHERE AREAS.ID = ?", [id]);
  }

  static findByUserId(userId) {
    return db.execute("SELECT * FROM AREAS WHERE AREAS.USERID = ?", [userId]);
  }
};
