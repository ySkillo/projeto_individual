var usuarioModel = require("../models/usuarioModel");


function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;


    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log("resultado do autenticador:" + resultadoAutenticar);
                        
                        res.json({
                            id: resultadoAutenticar[0].idUsuario,
                            email: resultadoAutenticar[0].emailUsuario,
                            nome: resultadoAutenticar[0].nomeUsuario,
                            foto: resultadoAutenticar[0].fotoPerfil,
                            cpf: resultadoAutenticar[0].cpfUsuario,
                            senha: resultadoAutenticar[0].senhaUsuario
                        });
                           
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}


function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var imagem = req.body.imagemServer;
    var perfil = req.body.perfilServer;
    var cpf = req.body.cpfServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (perfil == undefined) {
        res.status(400).send("Seu perfil está undefined!");
    } else if (imagem == undefined) {
        res.status(400).send("Sua imagem perfil está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, imagem, perfil, cpf)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}



function pesquisarUsuario(req, res){
    const nomePerfilUsuario = req.query.nomePerfilUsuario; // vai conter "o nome inserido na pesquisa"
    usuarioModel.pesquisarUsuario(nomePerfilUsuario).then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("nenhum resultado encontrado!");
        }
    }).catch(function (erro){
        console.log(erro)   
        console.log("Houve um erro ao buscar usuario: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    autenticar,
    pesquisarUsuario,
    cadastrar
}