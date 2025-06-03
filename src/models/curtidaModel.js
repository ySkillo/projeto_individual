var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function realizarCurtida(Curtida, idUsuario, idPostagem, idDono) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function realizarCurtida():", Curtida, idUsuario, idPostagem, idDono);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
         INSERT INTO tbCurtidas (fkUsuarioSelecionado, fkUsuarioPostagem, fkPostagemSelecionada, curtida) VALUES (${idUsuario}, ${idDono}, ${idPostagem}, '${Curtida}');
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
};





function curtidasFeitas(idUsuario) {
    console.log("ACESSEI AS POSTAGENS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function curtidasFeitas())");
    var instrucaoSql = `
        select fkPostagemSelecionada, fkUsuarioSelecionado, curtida from tbCurtidas
	        where fkUsuarioSelecionado = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function removendoCurtida(idUsuario, idPostagem) {
    console.log("ACESSO DELETE DE COMENTARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function removendoCurtida())");
    var instrucaoSql = `
        DELETE FROM tbCurtidas
	        WHERE fkUsuarioSelecionado = ${idUsuario} AND fkPostagemSelecionada = ${idPostagem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}





function quantidadeCurtidas(idPostagem) {
    console.log("ACESSEI AS POSTAGENS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function quantidadeCurtidas())");
    var instrucaoSql = `
        SELECT COUNT(fkPostagemSelecionada) FROM tbCurtidas
		WHERE fkPostagemSelecionada = ${idPostagem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function apagarCurtidasDaPostagem(idPostagem){
     console.log("ACESSEI AS POSTAGENS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function apagarCurtidasDaPostagem())");
    var instrucaoSql = `
         DELETE FROM tbCurtidas WHERE fkPostagemSelecionada = ${idPostagem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    realizarCurtida,
    curtidasFeitas,
    removendoCurtida,
    quantidadeCurtidas,
    apagarCurtidasDaPostagem
};