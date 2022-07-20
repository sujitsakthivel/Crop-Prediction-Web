const User = require("../models/user");
const Stat = require("../models/stats");
const Nexmo = require("nexmo");
const sessionStorage = require("sessionstorage");

const nexmo = new Nexmo({
  apiKey: "API_KEY",
  apiSecret: "API_SECREY_KEY",
});

exports.getLogin = (req, res, next) => {
  res.render("login", {
    alarm: false,
  });
};

exports.getHome = (req, res, next) => {
  res.render("home", {
    alarm: false,
  });
};

exports.getAbout = (req, res, next) => {
  Stat.fetchAll()
    .then(([stat]) => {
      const stats = Object.keys(stat[0]);
      const data = Object.values(stat[0]);
      res.render("about", {
        stats: stats,
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postInsertUser = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const dob = req.body.dob;
  const phNum = req.body.phNum;
  const id = new Date().valueOf().toString();
  const user = new User(id, username, password, dob, phNum);

  // client.messages
  //   .create({
  //     body: `Your ID: ${id} and your password: ${password}`,
  //     from: "+18126152864",
  //     to: "91" + phNum,
  //   })
  //   .then((message) => console.log(message.sid));

  const from = "";
  const to = "91" + phNum;
  const text = `Your ID: ${id} and your password: ${password}`;
  nexmo.message.sendSms(from, to, text);
  // console.log(text);

  user
    .save()
    .then(() => {
      const stat = new Stat(id);
      stat
        .save()
        .then(() => {
          res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.loginUser = (req, res, next) => {
  const loginid = req.body.loginid;
  const password = req.body.loginPassword;
  User.findById(loginid, password)
    .then(([user]) => {
      if (user.length > 0) {
        sessionStorage.setItem("userid", user[0].id);
        sessionStorage.setItem("username", user[0].name);
        res.redirect("/area");
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUserStatistics = (req, res, next) => {
  const userid = sessionStorage.getItem("userid");
  const username = sessionStorage.getItem("username");
  Stat.findById(userid)
    .then(([stat]) => {
      const stats = Object.keys(stat[0]).slice(1);
      const data = Object.values(stat[0]).slice(1);
      res.render("stats/stat", {
        pageTitle: "User Statistics",
        path: "/statistics",
        username: username,
        stats: stats,
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  sessionStorage.clear();
  res.redirect("/");
};
