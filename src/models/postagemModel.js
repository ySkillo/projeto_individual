var database = require("../database/config");

function listar() {
    console.log("ACESSEI AS POSTAGENS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar())");
    var instrucaoSql = `
        select p.*, u.nomeUsuario from tbPostagem as p 
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
        WHERE u.idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    postagensUsuario
}