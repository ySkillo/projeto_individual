var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function curtidasSemana(idUsuario) {
    console.log("ACESSEI A DASHBOARD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t \n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function curtidasSemana():", idUsuario);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
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

module.exports = {
    curtidasSemana
};