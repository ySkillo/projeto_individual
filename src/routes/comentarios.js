var express = require("express");
const comentarioController = require("../controllers/comentarioController"); // nome correto
var router = express.Router();

router.get("/comentarioRealizado", function (req, res) {
    comentarioController.comentarioRealizado(req, res); // nome da função correto
});

module.exports = router;
