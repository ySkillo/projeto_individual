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


function fazerComentario(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var comentario = req.body.comentarioServer;
    var usuario = req.body.usuarioServer;
    var postagem = req.body.postagemServer

    // Faça as validações dos valores
    if (comentario == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (usuario == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (postagem == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        comentarioModel.fazerComentario(comentario, usuario, postagem)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o comentario! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}



function apagarComentariosDaPostagem(req, res){
    var idPostagem = req.query.idPostagem;

    if (!idPostagem) {
        return res.status(400).send("Parâmetros idUsuario e idPostagem são obrigatórios.");
    }

    comentarioModel.apagarComentariosDaPostagem(idPostagem).then(function (resultado){
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
    comentarioRealizado,
    fazerComentario,
    apagarComentariosDaPostagem
}
