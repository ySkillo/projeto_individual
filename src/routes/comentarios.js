var express = require("express");
const comentarioController = require("../controllers/comentarioController"); // nome correto
var router = express.Router();

router.get("/comentarioRealizado", function (req, res) {
    comentarioController.comentarioRealizado(req, res); // nome da função correto
});

router.post("/fazerComentario", function (req, res) {
    comentarioController.fazerComentario(req, res); // nome da função correto
});

router.delete("/apagarComentariosDaPostagem", function (req, res) {
    comentarioController.apagarComentariosDaPostagem(req, res); // nome da função correto
});


module.exports = router;
