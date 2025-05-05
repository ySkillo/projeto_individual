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











function realizarPostagem(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var titulo = req.body.tituloServer;
    var descricao = req.body.descricaoServer;
    var usuario = req.body.usuarioServer;
    var imagem = req.body.imagemServer;

    
    // Faça as validações dos valores
    if (titulo == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (descricao == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (usuario== undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (imagem== undefined) {
        res.status(400).send("Sua senha está undefined!");
    }else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        postagemModel.realizarPostagem(titulo, descricao, imagem, usuario)
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




function apagarPostagem(req, res){
    var idPostagem = req.query.idPostagem;

    if (!idPostagem) {
        return res.status(400).send("Parâmetros idUsuario e idPostagem são obrigatórios.");
    }

    postagemModel.apagarPostagem(idPostagem).then(function (resultado){
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
    usuarioSelecionado,
    realizarPostagem,
    apagarPostagem
}
