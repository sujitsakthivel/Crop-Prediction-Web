const express = require("express");

const areaController = require("../controllers/area");

const router = express.Router();

// router.get("/", areaController.getLogin);

// router.post("/insert", areaController.postInsertUser);

// router.post("/authenticate", areaController.loginUser);

// router.get("/logout", areaController.postLogout);

router.get("/area", areaController.getIndex);

router.get("/area/:areaId", areaController.getArea);

router.get("/prediction/:areaId", areaController.getCrops);

router.post("/select-crop", areaController.updateStat);

module.exports = router;
