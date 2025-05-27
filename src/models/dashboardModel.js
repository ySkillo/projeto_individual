var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function curtidasSemana(idUsuario) {
    console.log("ACESSEI A DASHBOARD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t \n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function curtidasSemana():", idUsuario);
    var instrucaoSql = `
            SELECT 
                DATE(c.dtCurtida) AS dia,
                COUNT(c.curtida) AS totalCurtidas
            FROM  
                tbCurtidas AS c
            WHERE 
                c.curtida = 'v'
                AND c.fkUsuarioPostagem = ${idUsuario}
            GROUP BY 
                DATE(c.dtCurtida)
            ORDER BY 
                dia DESC
            LIMIT 6;
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
};



function ultimasPostagens(idUsuario) {
    console.log("ACESSEI A DASHBOARD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t \n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function ultimasPostagens():", idUsuario);

    var instrucaoSql = `
            SELECT tituloPostagem 
            FROM tbPostagem 
            WHERE fkUsuario = ${idUsuario}
            ORDER BY idPostagem DESC 
            LIMIT 3;
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
};


function comentarioRecentes(idUsuario) {
    console.log("ACESSEI A DASHBOARD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t \n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function comentarioRecentes():", idUsuario);

    var instrucaoSql = `
            SELECT u.nomeUsuario, co.descricaoComentario, co.dtInteracao
            FROM tbComentarios co
            JOIN tbUsuario u ON u.idUsuario = co.fkUsuario
            JOIN tbPostagem p ON p.idPostagem = co.fkPostagem
            WHERE p.fkUsuario = ${idUsuario}
            ORDER BY co.dtInteracao DESC;
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
};

function notificacoes(idUsuario) {
    console.log("ACESSEI A DASHBOARD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t \n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function notificacoes():", idUsuario);

    var instrucaoSql = `
            SELECT u.nomeUsuario, p.tituloPostagem, c.dtCurtida
            FROM tbCurtidas c
            JOIN tbUsuario u ON u.idUsuario = c.fkUsuarioSelecionado
            JOIN tbPostagem p ON p.idPostagem = c.fkPostagemSelecionada
            WHERE c.fkUsuarioPostagem = ${idUsuario} AND c.curtida = 'v'
            ORDER BY c.dtCurtida DESC
            LIMIT 5;
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
};
function totalCurtidas(idUsuario) {
    console.log("ACESSEI A DASHBOARD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t \n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function totalCurtidas():", idUsuario);

    var instrucaoSql = `
            select count(curtida) as curtida from tbCurtidas
            join tbUsuario on idUsuario = fkUsuarioPostagem
            where idUsuario = ${idUsuario};
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
};
function quantidadePostagem(idUsuario) {
    console.log("ACESSEI A DASHBOARD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t \n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function quantidadePostagem():", idUsuario);

    var instrucaoSql = `
            select count(idPostagem) as poster from tbPostagem
            join tbUsuario on idUsuario = fkUsuario
            where idUsuario = ${idUsuario};	
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
};


module.exports = {
    curtidasSemana,
    ultimasPostagens,
    comentarioRecentes,
    notificacoes,
    totalCurtidas,
    quantidadePostagem
};