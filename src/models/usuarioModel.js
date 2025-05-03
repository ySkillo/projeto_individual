var database = require("../database/config")


function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, nomeUsuario, emailUsuario, cpfUsuario FROM tbUsuario WHERE emailUsuario = '${email}' AND senhaUsuario = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


//pesquisa de usuario
function pesquisarUsuario(nomePerfilUsuario) {
    console.log("ACESSEI O USUARIO MODEL");
    instrucaoSql = `
        SELECT nomePerfilUsuario FROM tbUsuario
        WHERE nomePerfilUsuario LIKE '${nomePerfilUsuario}%';
    `;
    return database.executar(instrucaoSql);
}



// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, cpf) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, cpf);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO tbUsuario (nomeUsuario, nomePerfilUsuario, emailUsuario, senhaUsuario, cpfUsuario, fotoPerfil) VALUES ('${nome}','${null}', '${email}', '${senha}', '${cpf}', '${null}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    pesquisarUsuario,
    cadastrar
};