var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/curtidasSemana", function (req, res){
    dashboardController.curtidasSemana(req, res);
})

router.get("/ultimasPostagens", function (req, res){
    dashboardController.ultimasPostagens(req, res);
})

router.get("/comentarioRecentes", function (req, res){
    dashboardController.comentarioRecentes(req, res);
})

router.get("/notificacoes", function (req, res){
    dashboardController.notificacoes(req, res);
})

router.get("/totalCurtidas", function (req, res){
    dashboardController.totalCurtidas(req, res);
})

router.get("/quantidadePostagem", function (req, res){
    dashboardController.quantidadePostagem(req, res);
})

module.exports = router;