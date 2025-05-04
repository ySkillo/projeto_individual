var comentarioModel = require("../models/comentarioModel");


function comentarioRealizado(req, res){
    var idPostagem = req.query.idPostagem;

    if (!idPostagem) {
        return res.status(400).send("Parâmetros idUsuario e idPostagem são obrigatórios.");
    }

    comentarioModel.comentarioRealizado(idPostagem).then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("nenhum resultado encontrado!");
        }
    }).catch(function (erro){
        console.log(erro)   
        console.log("Houve um erro ao buscar postagens: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
module.exports = {
    comentarioRealizado
}
