var database = require("../database/config");

function listar() {
    console.log("ACESSEI AS POSTAGENS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar())");
    var instrucaoSql = `
        select p.*, u.nomeUsuario, u.nomePerfilUsuario, u.fotoPerfil from tbPostagem as p 
            join tbUsuario as u
	            on p.fkUsuario = u.idUsuario
                order by p.idPostagem desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function postagensUsuario(idUsuario) {
    console.log("ACESSEI A POSTAGEM DO USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function postagensUsuario())");
    
    console.log(`Buscando postagens do usuário ${idUsuario}`);
    var instrucaoSql = `
        SELECT p.*
        FROM tbPostagem AS p
        JOIN tbUsuario AS u ON p.fkUsuario = u.idUsuario
        WHERE u.idUsuario = ${idUsuario}
        order by p.idPostagem desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function  usuarioSelecionado(nomePerfilUsuario) {
    console.log("ACESSEI A POSTAGEM DO USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function usuarioSelecionado())");
    
    console.log(`Buscando postagens do usuário ${nomePerfilUsuario}`);
    var instrucaoSql = `
        SELECT p.*, u.nomeUsuario
        FROM tbPostagem AS p
        JOIN tbUsuario AS u ON p.fkUsuario = u.idUsuario
        WHERE u.nomePerfilUsuario = '${nomePerfilUsuario}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}




//inserir postagem
function realizarPostagem(titulo, descricao, imagem, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function realizarPostagem():", titulo, descricao, imagem, idUsuario);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO tbPostagem (tituloPostagem, descricaoPostagem, imagemPostagem, fkUsuario) VALUES ('${titulo}','${descricao}','${imagem}',${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

//apagando postagem
function apagarPostagem(idPostagem) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function apagarPostagem():");
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        DELETE FROM tbPostagem WHERE idPostagem = ${idPostagem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}




module.exports = {
    listar,
    postagensUsuario,
    usuarioSelecionado,
    realizarPostagem,
    apagarPostagem
}