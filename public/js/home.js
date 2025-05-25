//Listando postagens
var idUsuarioSessao = sessionStorage.ID_USUARIO;


fetch("/postagem/listar", {
    method: "GET",
}).then(res => res.json())//pega a resposta (res) e transforma em JSON (um formato fácil de ler em JavaScript)
    .then(dados => {

        var container = document.getElementById("postagens");
        var buscarListas = "";
        container.innerHTML += buscarListas;

        dados.forEach(post => {//ele passa por cada postagem com o forEach

            if (idUsuarioSessao == post.fkUsuario) {

                buscarListas += `
                            <div class="postagem">
                                <div class="postagemFeita">    
                                <div class="perfil">
                                <img src="${post.fotoPerfil}" style="width: 40px; height: 40px; border-radius: 40px">
                                <div class="nomePerfil">
                                <div class="nome">${post.nomeUsuario}</div>
                                <span>@${post.nomePerfilUsuario}</span><br>
                                </div>
                                </div>
                                <button onclick="apagarComentariosDaPostagem('${post.idPostagem}')" style="color: #fff; border: none; background-color: transparent; margin-right: 10px; cursor: pointer; justify-content: center;align-items: center; display: flex;"><img src="../assets/img/Delete.svg"></button>
                                </div>
                                <div class="postagemFoto">
                                <div class="imagem"><img src="${post.imagemPostagem}" class="imagem_postagem" loading="lazy"></div>
                                </div>
                                <div class="titulo">${post.tituloPostagem}</div>
                                <div class="descricao">${post.descricaoPostagem}</div>
                                <div class="curtidasClass">
                                <button onclick="curtidasPostagem(this, '${post.idPostagem}', '${idUsuarioSessao}', '${post.fkUsuario}')" id="btn_curtida" data-id-postagem="${post.idPostagem}" class="botaoCurtirPost"><img src="../assets/img/icon/deslike.svg" alt=""></button>
                                <span id="qtdCurtidas-${post.idPostagem}">0</span><br>
                                <button onclick="comentarios(this); comentariosRealizados(this, '${post.idPostagem}')" class="botaoCurtirPost"><img src="../assets/img/icon/coment.svg"></button>
                                <input type="text" class="inputComentario" placeholder="realizar comentario..."><button onclick="realizarComentario(this, '${post.idPostagem}')" class="botaoComentario"></button>
                                <div class="boxComentarios" style="color: #fff">
                                    <p>Atualizando</p>    
                                    <p>COMENTARIOS...</p>    
                                </div>  
                                </div>
   
                                
                                
                            </div>
                        
                        `;

                quantidadeDeCurtidas(post.idPostagem);
                aplicarEstiloCurtidasFeitas();
            } else {
                buscarListas += `
                            <div class="postagem">
                                <div class="postagemFeita">    
                                <div class="perfil">
                                <img src="${post.fotoPerfil}" style="width: 40px; height: 40px; border-radius: 40px">
                                <div class="nomePerfil">
                                <div class="nome">${post.nomeUsuario}</div>
                                <span>@${post.nomePerfilUsuario}</span><br>
                                </div>
                                </div>
                               
                                </div>
                                <div class="postagemFoto">
                                <div class="imagem"><img src="${post.imagemPostagem}" class="imagem_postagem" loading="lazy"></div>
                                </div>
                                <div class="titulo">${post.tituloPostagem}</div>
                                <div class="descricao">${post.descricaoPostagem}</div>
                                <div class="curtidasClass">
                                <button onclick="curtidasPostagem(this, '${post.idPostagem}', '${idUsuarioSessao}', '${post.fkUsuario}')" id="btn_curtida" data-id-postagem="${post.idPostagem}" class="botaoCurtirPost"><img src="../assets/img/icon/deslike.svg" alt=""></button>
                                <span id="qtdCurtidas-${post.idPostagem}">0</span><br>
                                <button onclick="comentarios(this); comentariosRealizados(this, '${post.idPostagem}')" class="botaoCurtirPost"><img src="../assets/img/icon/coment.svg"></button>
                                <input type="text" class="inputComentario" placeholder="realizar comentario..."><button onclick="realizarComentario(this, '${post.idPostagem}')" class="botaoComentario"></button>
                                <div class="boxComentarios" style="color: #fff">
                                    <p>Atualizando</p>    
                                    <p>COMENTARIOS...</p>    
                                </div>  
                                </div>
   
                             
                                
                            </div>
                        `;
                quantidadeDeCurtidas(post.idPostagem);
                aplicarEstiloCurtidasFeitas();
            }

        })

        container.innerHTML = buscarListas;



    }).catch(
        function (erro) {
            postagens.innerHTML = "";
            postagens.innerHTML += `
                        <p>Nenhuma postagem</p>
                    `;
        }
    );



fetch(`/curtida/curtidasFeitas?idUsuario=${idUsuarioSessao}`, {
    method: "GET"
}).then(res => {
    if (res.status === 204) {
        return [];
    }
    return res.json();
})
    .then(retorno => {

        retorno.forEach(resposta => {//ele passa por cada postagem com o forEach

            console.log("Curtida feita: " + resposta.curtida)

        });
    }).catch(
        function (erro) {
            console.log("erro ao buscar curtidas")
        }
    );





function aplicarEstiloCurtidasFeitas() {
    fetch(`/curtida/curtidasFeitas?idUsuario=${idUsuarioSessao}`, {
        method: "GET"
    })
        .then(res => res.status === 204 ? [] : res.json())
        .then(dados => {
            dados.forEach(curtida => {
                const botaoCurtida = document.querySelector(`[data-id-postagem='${curtida.fkPostagemSelecionada}']`);
                if (botaoCurtida) {
                    botaoCurtida.classList.add("clicado");
                    botaoCurtida.innerHTML = `<img src="../assets/img/icon/like.svg" alt="">`;
                }
            });
        })
        .catch(err => {
            console.error("Erro ao aplicar estilo nas curtidas:", err);
        });
}








  function fazerPesquisa() {

        var pesquisar = input_pesquisar.value;
        var listar = [];

        if (pesquisar === "") {
            usuarios_pesquisa.innerHTML = "";
            usuarios_pesquisa.style.display = "none";

        } else {
            fetch(`/usuarios/pesquisarUsuario?nomePerfilUsuario=${encodeURIComponent(pesquisar)}`, { ///usuarios/pesquisarUsuario?nomePerfilUsuario=(letra ou nome)
                method: "GET",
            }).then(res => {
                if (res.status === 204) {
                    return [];
                }
                return res.json();
            }).then(dados => {
                listar = dados.map(post => post.nomePerfilUsuario); //.map percorre a array
                usuarios_pesquisa.style.display = "flex";
                usuarios_pesquisa.innerHTML = listar //atualiza a DOM com os nomes

                    .map(nome =>
                        `<h3 onclick="usuarioSelecionado(decodeURIComponent('${encodeURIComponent(nome)}'))">${nome}</h3>`
                    ).join("");

            }).catch(erro => {
                console.error("Erro na busca de usuários:", erro);
                usuarios_pesquisa.innerHTML = "<p>Erro ao buscar usuários.</p>";
            });
        }
    }










function usuarioSelecionado(armazenarUsuario) {
    var pesquisar = input_pesquisar.value;

    fetch(`/usuarios/pesquisarUsuario?nomePerfilUsuario=${encodeURIComponent(pesquisar)}`, { ///usuarios/pesquisarUsuario?nomePerfilUsuario=(letra ou nome)
        method: "GET",
    }).then(res => {
        if (res.status === 204) {
            return [];
        }
        return res.json();
    }).then(dados => {
        listar = dados.map(post => post.nomePerfilUsuario); //.map percorre a array
        if (!listar.includes(pesquisar)) {
            console.log("nome não existe");
        } else {
            console.log("nome existe");
            sessionStorage.NOME_PERFIL_USUARIO = pesquisar;
            setTimeout(function () {
                window.location = "perfilSelecionado.html";
            }, 1000);
        }
    }).catch(erro => {
        console.error("Erro na busca de usuários:", erro);
        usuarios_pesquisa.innerHTML = "<p>Erro ao buscar usuários.</p>";
    });

    if (armazenarUsuario) {
        sessionStorage.NOME_PERFIL_USUARIO = armazenarUsuario;
        setTimeout(function () {
            window.location = "perfilSelecionado.html";
        }, 1000);
    }

}





function comentarios(botao) {

    var divPostagem = botao.parentElement;

    // 2. Pega só o boxComentarios dessa postagem
    var box = divPostagem.querySelector(".boxComentarios");

    var clicado = botao.classList.toggle("clicado");
    //toggle retorna um valor booleano 
    //se ja tiver a class ele tira se não tiver ele adiciona
    //adicona (true) remove(false)

    if (clicado) {
        box.style.display = "block";
    } else {
        box.style.display = "none";
    }


};




function comentariosRealizados(botao, armazenarComentario) {

    var divPostagem = botao.parentElement;
    var box = divPostagem.querySelector(".boxComentarios");




    fetch(`/comentarios/comentarioRealizado?idPostagem=${armazenarComentario}`, {
        method: "GET",
    }).then(res => res.json())
        .then(usuario => {
            box.innerHTML = "";
            usuario.forEach(post => {

                const data = new Date(post.dtInteracao);
                const dataFormatada = data.toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                });

                box.innerHTML += `
                                <div class="mensagensInfo">
                                <div class="usuarioInfo">
                                    <img src="${post.fotoPerfil}" style="width: 40px; height: 40px; border-radius: 40px">
                                    <div class="infoName">
                                        <h3>@${post.nomePerfilUsuario}</h3>
                                        <p>Data e Hora: ${dataFormatada}</p>
                                    </div>
                                </div>
                                <p style="margin-top: 10px">${post.descricaoComentario}</p>
                                </div>
                                `;

            })

        }).catch(
                function (erro) {
                    box.innerHTML = "";
                    box.innerHTML += `
                        <p>Nenhum comentario</p>
                    `;
                }
            );


}





//pegar valor do input de comentario.
function valorInput(input) {
    return input.value;
}
function realizarComentario(botao, idPostagem) {
    var input = botao.previousElementSibling; // pega o input que vem antes do botão é obrigatório que ele esteja antes.
    var comentarioVar = valorInput(input);
    var usuarioVar = idUsuarioSessao;
    var postagemVar = idPostagem    

    console.log("comentario: " + comentarioVar + " postagem: " + postagemVar + " usuario: " + usuarioVar);


    // Verificando se há algum campo em branco
    if (
        comentarioVar == "" ||
        usuarioVar == "" ||
        postagemVar == ""
    ) {
        console.log("Preencha todos os campos!");
        return false;
    } else {
        console.log("Todos os campos preenchidos!");
    }



    // Enviando o valor da nova input
    fetch("/comentarios/fazerComentario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            comentarioServer: comentarioVar,
            usuarioServer: usuarioVar,
            postagemServer: postagemVar

        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                // setTimeout(() => {
                //   window.location = "login.html";
                // }, "2000");
                console.log("comentario realizado")
                input.value = "";
                comentariosRealizados(botao, idPostagem);

            } else {
                throw "Houve um erro ao tentar realizar o comentario!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });


}




function apagarComentariosDaPostagem(idPostagem) {
    console.log("Apagando comentários da postagem:", idPostagem);

    fetch(`/comentarios/apagarComentariosDaPostagem?idPostagem=${idPostagem}`, {
        method: "DELETE"
    })
        .then(res => {
            if (res.ok) {
                console.log("Comentários apagados com sucesso.");
                // Agora você pode chamar a função que deleta a postagem
                deletarPostagem(idPostagem);
            } else {
                console.error("Erro ao apagar os comentários.");
            }
        })
        .catch((erro) => {
            console.log("Não foi possível apagar os comentários:", erro);
        });
}



function deletarPostagem(idPostagem) {
    console.log("Apagando postagem:", idPostagem);

    fetch(`/postagem/apagarPostagem?idPostagem=${idPostagem}`, {
        method: "DELETE"
    })
        .then(res => {
            if (res.ok) {
                console.log("Postagem apagada com sucesso.");
                location.reload();
            } else {
                console.error("Erro ao apagar os postagem.");
            }
        })
        .catch((erro) => {
            console.log("Não foi possível apagar a postagem:", erro);
        });
}


function curtidasPostagem(curtir, postagem, usuario, donoPostagem) {

    var usuarioVar = usuario;
    var postagemVar = postagem;
    var donoPostagemVar = donoPostagem;
    const clicado = curtir.classList.toggle("clicado")

    if (clicado) {
        verificacao = "v";

        curtir.innerHTML = `<img src="../assets/img/icon/like.svg" alt="">`
        console.log("Usuario: " + usuarioVar + " Postagem: " + postagemVar + " curtida: " + verificacao + " dono da postagem: " + donoPostagemVar)

        // Enviando o valor da nova input
        fetch("/curtida/realizarCurtida", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                usuarioServer: usuarioVar,
                postagemServer: postagemVar,
                donoServer: donoPostagemVar,
                verificacaoServer: verificacao
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);
                quantidadeDeCurtidas(postagemVar)
                if (resposta.ok) {
                    console.log("curtida realizada");
                    quantidadeDeCurtidas(postagemVar)
                    window.onload = function recarregarCurtidas() {
                        fetch(`/curtida/curtidasFeitas?idUsuario=${idUsuarioSessao}`, {
                            method: "GET"
                        }).then(res => {
                            if (res.status === 204) {
                                return [];
                            }
                            return res.json();
                        })
                            .then(dados => {

                                dados.forEach(post => {//ele passa por cada postagem com o forEach
                                    const botao = document.querySelector(`[data-id-postagem='${post.fkPostagemSelecionada}']`);

                                    if (botao) {
                                        botao.classList.add("clicado");
                                        botao.innerHTML = `<img src="../assets/img/icon/like.svg" alt="">`
                                    } else {
                                        botao.innerHTML = `<img src="../assets/img/icon/deslike.svg" alt="">`

                                    }

                                });
                            }).catch(
                                function (erro) {
                                    console.log("erro ao buscar curtidas")
                                }
                            );
                    }


                } else {
                    fetch(`/curtida/removendoCurtida?idUsuario=${usuarioVar}&idPostagem=${postagemVar}`, {
                        method: "DELETE"
                    })
                        .then(res => {
                            if (res.ok) {
                                console.log("Curtidas apagadas com sucesso.");

                            } else {
                                console.error("Erro ao apagar Curtidas.");
                            }
                        })
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });




    } else {
        curtir.innerHTML = `<img src="../assets/img/icon/deslike.svg" alt="">`
        verificacao = "f";
        console.log("Curtida removida / Usuario: " + usuarioVar + " Postagem: " + postagemVar + " curtida: " + verificacao + " dono da postagem: " + donoPostagemVar)

        fetch(`/curtida/removendoCurtida?idUsuario=${usuarioVar}&idPostagem=${postagemVar}`, {
            method: "DELETE"
        })
            .then(res => {
                if (res.ok) {
                    quantidadeDeCurtidas(postagemVar)
                    console.log("Curtida apagada com sucesso.");
                } else {
                    console.error("Erro ao apagar Curtida.");
                }
            })

    }

}





function quantidadeDeCurtidas(idPostagem) {
    fetch(`/curtida/quantidadeCurtidas?idPostagem=${idPostagem}`, {
        method: "GET"
    }).then(res => {
        if (res.status === 204) {
            return [];
        }
        return res.json();
    })
        .then(retorno => {

            retorno.forEach(resposta => {//ele passa por cada postagem com o forEach

                console.log("IdPostagem das curtidas: " + resposta['COUNT(fkPostagemSelecionada)'], idPostagem)
                var quantidadeCurtidas = resposta['COUNT(fkPostagemSelecionada)'];


                var spanCurtidas = document.getElementById(`qtdCurtidas-${idPostagem}`);
                if (spanCurtidas) {
                    spanCurtidas.textContent = quantidadeCurtidas;
                }

            });
        }).catch(
            function (erro) {
                console.log("erro ao buscar curtidas")
            }
        );

}





