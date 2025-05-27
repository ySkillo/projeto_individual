var dashboardModel = require("../models/dashboardModel");



function curtidasSemana(req, res){
    var idUsuario = req.query.idUsuario;
    dashboardModel.curtidasSemana(idUsuario).then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("nenhuma curtida da semana encontrada");
        }
    }).catch(function (erro){
        console.log(erro)   
        console.log("Houve um erro ao buscar curtidas: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function ultimasPostagens(req, res){
    var idUsuario = req.query.idUsuario;
    dashboardModel.ultimasPostagens(idUsuario).then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("nenhuma curtida da semana encontrada");
        }
    }).catch(function (erro){
        console.log(erro)   
        console.log("Houve um erro ao buscar curtidas: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function comentarioRecentes(req, res){
    var idUsuario = req.query.idUsuario;
    dashboardModel.comentarioRecentes(idUsuario).then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("nenhuma curtida da semana encontrada");
        }
    }).catch(function (erro){
        console.log(erro)   
        console.log("Houve um erro ao buscar curtidas: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function notificacoes(req, res){
    var idUsuario = req.query.idUsuario;
    dashboardModel.notificacoes(idUsuario).then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("nenhuma curtida da semana encontrada");
        }
    }).catch(function (erro){
        console.log(erro)   
        console.log("Houve um erro ao buscar curtidas: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function totalCurtidas(req, res){
    var idUsuario = req.query.idUsuario;
    dashboardModel.totalCurtidas(idUsuario).then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("nenhuma curtida da semana encontrada");
        }
    }).catch(function (erro){
        console.log(erro)   
        console.log("Houve um erro ao buscar curtidas: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function quantidadePostagem(req, res){
    var idUsuario = req.query.idUsuario;
    dashboardModel.quantidadePostagem(idUsuario).then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("nenhuma curtida da semana encontrada");
        }
    }).catch(function (erro){
        console.log(erro)   
        console.log("Houve um erro ao buscar curtidas: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    curtidasSemana,
    ultimasPostagens,
    comentarioRecentes,
    notificacoes,
    totalCurtidas,
    quantidadePostagem
}