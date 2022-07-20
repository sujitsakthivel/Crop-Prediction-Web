const express = require("express");

const loginController = require("../controllers/login");

const router = express.Router();

router.get("/", loginController.getHome);

router.get("/login", loginController.getLogin);

router.get("/about", loginController.getAbout);

router.post("/insert", loginController.postInsertUser);

router.post("/authenticate", loginController.loginUser);

router.get("/logout", loginController.postLogout);

router.get("/statistics", loginController.getUserStatistics);

module.exports = router;
