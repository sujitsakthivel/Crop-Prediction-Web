const Area = require("../models/area");
const Weather = require("../models/weather");
const Crop = require("../models/crop");
const Soil = require("../models/soil");
const Stat = require("../models/stats");
const sessionStorage = require("sessionstorage");

exports.getAreas = (req, res, next) => {
  Area.fetchAll()
    .then(([areas]) => {
      res.render("area/area-list", {
        prods: areas,
        pageTitle: "All Areas",
        path: "/areas",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getArea = (req, res, next) => {
  const areaId = req.params.areaId;
  const userid = sessionStorage.getItem("userid");
  const username = sessionStorage.getItem("username");
  Area.findById(areaId)
    .then(([area]) => {
      Weather.findById(areaId).then(([weather]) => {
        res.render("area/area-detail", {
          area: area[0],
          weather: weather[0],
          userid: userid,
          username: username,
          pageTitle: area[0].title,
          path: "/areas",
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  const userid = sessionStorage.getItem("userid");
  const username = sessionStorage.getItem("username");
  Area.findByUserId(userid)
    .then(([rows]) => {
      res.render("area/index", {
        arr: rows,
        userid: userid,
        username: username,
        pageTitle: "Area",
        path: "/area",
      });
    })
    .catch((err) => console.log(err));
};

exports.updateStat = (req, res, next) => {
  const cropName = req.body.cropName;
  const userid = sessionStorage.getItem("userid");
  Stat.update(userid, cropName)
    .then(() => {
      res.redirect("/area");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCrops = (req, res, next) => {
  const areaId = req.params.areaId;
  const userid = sessionStorage.getItem("userid");
  const username = sessionStorage.getItem("username");
  Area.findById(areaId)
    .then(([area]) => {
      Weather.findById(areaId)
        .then(([weather]) => {
          Soil.findByAreaId(areaId)
            .then(([soil]) => {
              const s = soil[0];
              // console.log(s);
              Crop.findBySoilProps(
                s.c_amt,
                s.n_amt,
                s.p_amt,
                s.php_amt,
                s.ph_lvl,
                weather[0].temperature
              )
                .then(([crops]) => {
                  // console.log(crops);
                  res.render("crop/crops", {
                    area: area[0],
                    arr: crops,
                    userid: userid,
                    username: username,
                    pageTitle: "Crops",
                    path: "/prediction",
                  });
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
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.getLogin = (req, res, next) => {
//   res.render("login", {
//     alarm: false,
//   });
// };

// exports.postInsertUser = (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   const dob = req.body.dob;
//   const phNum = req.body.phNum;
//   const id = new Date().valueOf().toString();
//   const user = new User(id, username, password, dob, phNum);
//   user
//     .save()
//     .then(() => {
//       res.redirect("/");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// exports.loginUser = (req, res, next) => {
//   const loginid = req.body.loginid;
//   const password = req.body.loginPassword;
//   User.findById(loginid, password)
//     .then(([user]) => {
//       if (user.length > 0) {
//         Area.findByUserId(user[0].id)
//           .then(([rows]) => {
//             sessionStorage.setItem("userid", user[0].id);
//             console.log(sessionStorage.getItem("userid"));
//             res.redirect("/area");
//           })
//           .catch((err) => console.log(err));
//       } else {
//         res.redirect("/");
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// exports.postLogout = (req, res, next) => {
//   sessionStorage.clear();
//   res.redirect("/");
// };
