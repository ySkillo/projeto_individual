var express = require("express");
const postagemControler = require("../controllers/postagemController");
var router = express.Router();

router.get("/listar", function (req, res) {
    postagemControler.listar(req, res);
});

router.get("/postagensUsuario", function (req, res) {
    postagemControler.postagensUsuario(req, res);
});

router.get("/usuarioSelecionado", function (req, res) {
    postagemControler.usuarioSelecionado(req, res);
});

router.post("/realizarPostagem", function (req, res) {
    postagemControler.realizarPostagem(req, res);
});


router.delete("/apagarPostagem", function (req, res) {
    postagemControler.apagarPostagem(req, res); // nome da função correto
});

module.exports = router;