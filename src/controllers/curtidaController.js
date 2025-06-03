var curtidaModel = require("../models/curtidaModel");


function realizarCurtida(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html


    var usuario = req.body.usuarioServer;
    var postagem = req.body.postagemServer;
    var dono = req.body.donoServer;
    var verificacao = req.body.verificacaoServer;

    // Faça as validações dos valores
    if (usuario == undefined) {
        res.status(400).send("Seu usuario está undefined!");
    } else if (postagem == undefined) {
        res.status(400).send("Seu postagem está undefined!");
    } else if (dono == undefined) {
        res.status(400).send("O dono da postagem está undefined!");
    } else if (verificacao == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        curtidaModel.realizarCurtida(verificacao, usuario, postagem, dono)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o curtida! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}



function curtidasFeitas(req, res){
    var idUsuario = req.query.idUsuario;
    curtidaModel.curtidasFeitas(idUsuario).then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("nenhuma curtida encontrada");
        }
    }).catch(function (erro){
        console.log(erro)   
        console.log("Houve um erro ao buscar curtidas: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}







function removendoCurtida(req, res){
    var idPostagem = req.query.idPostagem;
    var idUsuario = req.query.idUsuario;

    if (!idPostagem || !idUsuario) {
        return res.status(400).send("Parâmetros idUsuario e idPostagem são obrigatórios.");
    }

    curtidaModel.removendoCurtida(idUsuario, idPostagem).then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("nenhum comentario!");
        }
    }).catch(function (erro){
        console.log(erro)   
        console.log("Houve um erro ao remover curtida: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}








function quantidadeCurtidas(req, res){
    var idPostagem = req.query.idPostagem;
    curtidaModel.quantidadeCurtidas(idPostagem).then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("nenhuma curtida encontrada");
        }
    }).catch(function (erro){
        console.log(erro)   
        console.log("Houve um erro ao buscar curtidas: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function apagarCurtidasDaPostagem(req, res){
    var idPostagem = req.query.idPostagem;

    if (!idPostagem) {
        return res.status(400).send("Parâmetro idPostagem é obrigatório.");
    }
    curtidaModel.apagarCurtidasDaPostagem(idPostagem).then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("nenhuma curtida!");
        }
    }).catch(function (erro){
        console.log(erro)   
        console.log("Houve um erro ao remover curtida: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    realizarCurtida,
    curtidasFeitas,
    removendoCurtida,
    quantidadeCurtidas,
    apagarCurtidasDaPostagem
}