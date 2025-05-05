var express = require("express");
var router = express.Router();

var curtidaController = require("../controllers/curtidaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/realizarCurtida", function (req, res) {
    curtidaController.realizarCurtida(req, res);
})

router.get("/curtidasFeitas", function (req, res) {
    curtidaController.curtidasFeitas(req, res);
});

router.delete("/removendoCurtida", function (req, res) {
    curtidaController.removendoCurtida(req, res);
});

router.get("/quantidadeCurtidas", function (req, res) {
    curtidaController.quantidadeCurtidas(req, res);
});

module.exports = router;