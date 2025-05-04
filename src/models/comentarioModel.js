var database = require("../database/config");


function comentarioRealizado(idPostagem) {
    console.log("ACESSEI AS POSTAGENS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function comentarioRealizado())");
    var instrucaoSql = `
        SELECT c.idComentario, c.descricaoComentario, c.dtInteracao,
        p.idPostagem, u.nomePerfilUsuario, u.idUsuario FROM tbComentarios as c 
        JOIN tbPostagem as p
        on c.fkPostagem = p.idPostagem
        JOIN tbUsuario as u
        on c.fkUsuario = u.idUsuario
        WHERE c.fkPostagem = ${idPostagem}
        order by c.idComentario desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function fazerComentario(comentarioUsuario, idUsuario, idPostagem){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", idPostagem, idUsuario, comentarioUsuario);
    
    var instrucaoSql = `
        INSERT INTO tbComentarios (descricaoComentario, fkPostagem, fkUsuario) VALUES ('${comentarioUsuario}',${idPostagem},${idUsuario});
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    comentarioRealizado,
    fazerComentario
}