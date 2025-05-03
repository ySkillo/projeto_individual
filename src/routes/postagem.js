var express = require("express");
const postagemControler = require("../controllers/postagemController");
var router = express.Router();

router.get("/listar", function (req, res) {
    postagemControler.listar(req, res);
});

router.get("/postagensUsuario", function (req, res) {
    postagemControler.postagensUsuario(req, res);
});

module.exports = router;