// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var foto = sessionStorage.FOTO_USUARIO;


    var data = "26/05/2025, 16:15"

    if (email != null && nome != null) {    
        perfil_usuario.innerHTML = `
            <div>
                <p style="color: #232323;">${nome}</p>
                <p style="color: #9D9D9D; font-size: 0.85rem;">${data}</p>
            </div>
            <img src="${foto}">
        `
        
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}