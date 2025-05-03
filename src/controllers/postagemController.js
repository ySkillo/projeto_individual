var postagemModel = require("../models/postagemModel");

function listar(req, res){
    postagemModel.listar().then(function (resultado){
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


function postagensUsuario(req, res){
    var idUsuario = req.query.idUsuario;
    postagemModel.postagensUsuario(idUsuario).then(function (resultado){
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


function usuarioSelecionado(req, res){
    var nomePerfilUsuario = req.query.nomePerfilUsuario;
    postagemModel.usuarioSelecionado(nomePerfilUsuario).then(function (resultado){
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
    listar,
    postagensUsuario,
    usuarioSelecionado
}
