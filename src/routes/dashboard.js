var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/curtidasSemana", function (req, res){
    dashboardController.curtidasSemana(req, res);
})


module.exports = router;