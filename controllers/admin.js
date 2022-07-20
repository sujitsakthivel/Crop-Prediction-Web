const Area = require("../models/area");
const Weather = require("../models/weather");
const Soil = require("../models/soil");
const sessionStorage = require("sessionstorage");
const https = require("https");

exports.getAddArea = (req, res, next) => {
  const userid = sessionStorage.getItem("userid");
  const username = sessionStorage.getItem("username");
  res.render("admin/edit-area", {
    pageTitle: "Add Area",
    path: "/admin/add-area",
    userid: userid,
    username: username,
    editing: false,
  });
};

exports.postAddArea = (req, res, next) => {
  const name = req.body.name;
  const imageurl = req.body.imageurl;
  const pincode = req.body.pincode;
  const id = new Date().valueOf().toString();
  const userId = sessionStorage.getItem("userid");
  const area = new Area(id, name, imageurl, pincode, userId);

  const appid = "PUT_YOUR_API_KEY";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    name +
    "&appid=" +
    appid +
    "&units=" +
    unit;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const weather = new Weather(
        id,
        weatherData.main.temp,
        weatherData.main.pressure,
        weatherData.main.humidity,
        Math.floor(Math.random() * 50)
      );

      weather
        .save()
        .then(() => {
          // res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });

  area
    .save()
    .then(() => {
      const soilId = new Date().valueOf().toString();
      const type = req.body.type;
      const c_amt = req.body.c_amt;
      const n_amt = req.body.n_amt;
      const p_amt = req.body.p_amt;
      const php_amt = req.body.php_amt;
      const ph_lvl = req.body.ph_lvl;
      const soil = new Soil(
        soilId,
        type,
        c_amt,
        n_amt,
        p_amt,
        php_amt,
        ph_lvl,
        id
      );
      soil
        .save()
        .then(() => {
          res.redirect("/area");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAreas = (req, res, next) => {
  const userid = sessionStorage.getItem("userid");
  const username = sessionStorage.getItem("username");
  Area.findByUserId(userid)
    .then(([areas]) => {
      res.render("admin/areas", {
        userid: userid,
        username: username,
        arr: areas,
        pageTitle: "Admin areas",
        path: "/admin/areas",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditArea = (req, res, next) => {
  const areaId = req.params.areaId;
  const userid = sessionStorage.getItem("userid");
  const username = sessionStorage.getItem("username");
  Area.findById(areaId)
    .then(([area]) => {
      Soil.findByAreaId(areaId)
        .then(([soilprops]) => {
          res.render("admin/edit-area", {
            area: area[0],
            soil: soilprops[0],
            userid: userid,
            username: username,
            pageTitle: "Edit Area",
            path: "/admin/edit-area",
            editing: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.getAddArea = (req, res, next) => {
//   res.render("admin/edit-area", {
//     pageTitle: "Add Area",
//     path: "/admin/add-area",
//     editing: false,
//   });
// };

exports.postEditArea = (req, res, next) => {
  const name = req.body.name;
  const imageurl = req.body.imageurl;
  const pincode = req.body.pincode;
  const id = req.body.areaId;
  const userid = sessionStorage.getItem("userid");
  const area = new Area(id, name, imageurl, pincode, userid);

  area
    .update()
    .then(() => {
      const soilId = req.body.soilId;
      const type = req.body.type;
      const c_amt = req.body.c_amt;
      const n_amt = req.body.n_amt;
      const p_amt = req.body.p_amt;
      const php_amt = req.body.php_amt;
      const ph_lvl = req.body.ph_lvl;
      const soil = new Soil(
        soilId,
        type,
        c_amt,
        n_amt,
        p_amt,
        php_amt,
        ph_lvl,
        id
      );
      soil
        .update()
        .then(() => {
          res.redirect("/area");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteArea = (req, res, next) => {
  const areaId = req.body.areaId;
  Soil.deleteById(areaId)
    .then(() => {
      Weather.deleteById(areaId)
        .then(() => {
          Area.deleteById(areaId)
            .then(() => {
              res.redirect("/admin/areas");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
