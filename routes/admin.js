const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/add-area", adminController.getAddArea);

router.get("/areas", adminController.getAreas);

router.post("/add-area", adminController.postAddArea);

router.get("/edit-area/:areaId", adminController.getEditArea);

router.post("/edit-area", adminController.postEditArea);

router.post("/delete-area", adminController.postDeleteArea);

module.exports = router;
