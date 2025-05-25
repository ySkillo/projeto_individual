var idUsuarioSessao = sessionStorage.ID_USUARIO;


function mostrarImagem() {
    const fileInput = document.getElementById('fileInput');
    const div_img = document.getElementById('div_img');

    if (fileInput.files && fileInput.files[0]) {
        const imagemURL = URL.createObjectURL(fileInput.files[0]);
        div_img.innerHTML = `<img src="${imagemURL}" style="width: 100%; height: 350px; object-fit: cover;">`;
    } else {
        div_img.innerHTML = "Nenhuma imagem selecionada.";
    }
}

var idUsuario = sessionStorage.ID_USUARIO;


fetch(`/postagem/postagensUsuario?idUsuario=${idUsuario}`, {
    method: "GET"
}).then(res => {
    if (res.status === 204) {
        return [];
    }
    return res.json();
})
    .then(dados => {

        var container = document.getElementById("postagens");
        container.innerHTML = "";

        dados.forEach(post => {//ele passa por cada postagem com o forEach
            container.innerHTML += `
                <div class="postagem">
                    
                    <div class="imagem"><img src="${post.imagemPostagem}">
                        <div class="conteudo">
                            <div class="conteudo_postagem">
                                <div class="titulo">${post.tituloPostagem}</div>
                                <div class="descricao"><strong>Descrição:</strong> <p>${post.descricaoPostagem}</p></div>
                            </div>
                            <div class="curtidaDiv">
                                <button onclick="curtidasPostagem(this, '${post.idPostagem}', '${idUsuarioSessao}', '${post.fkUsuario}')" id="btn_curtida" data-id-postagem="${post.idPostagem}"><img src="../assets/img/icon/deslike.svg" alt="" style="width: 30px; height: 30px"></button>
                                <span id="qtdCurtidas-${post.idPostagem}">0</span><br>
                            </div>
                            <button onclick="comentarios(this); comentariosRealizados(this, '${post.idPostagem}')" class="abrirComentarios"><img src="../assets/img/icon/TopicBranco.svg" style="width: 30px; height: 30px"></button>
                            <button onclick="apagarComentariosDaPostagem('${post.idPostagem}')" class="deletar"><img src="../assets/img/Delete.svg" alt="" style="width: 30px; height: 30px"></button>
                        </div>
                    </div>
                    <div class="boxComentarios">
                        <div style="widht: 100%; heigth: 100%; display: flex; align-items: center; justify-content: center;">

                        <img src="../assets/img/icon/carregamento.gif" alt="" style="width: 30px; height: 30px"> 
                        </div>
                    </div>
                </div>
            `;

            quantidadeDeCurtidas(post.idPostagem);

        });
    }).catch(
        function (erro) {
            console.log("Nenhuma postagem")
        }
    );







function comentarios(botao) {

    const divPostagem = botao.closest(".postagem");

    // 2. Pega só o boxComentarios dessa postagem
    const box = divPostagem.querySelector(".boxComentarios");

    const clicado = botao.classList.toggle("clicado");
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

    const divPostagem = botao.closest(".postagem");
    const box = divPostagem.querySelector(".boxComentarios");



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




function atualizarPagina() {
    fetch(`/postagem/postagensUsuario?idUsuario=${idUsuario}`, {
        method: "GET"
    }).then(res => {
        if (res.status === 204) {
            return [];
        }
        return res.json();
    })
        .then(dados => {

            const container = document.getElementById("postagens");

            container.innerHTML = "";

            dados.forEach(post => {//ele passa por cada postagem com o forEach
                container.innerHTML += `
                  <div class="postagem">
                    
                    <div class="imagem"><img src="${post.imagemPostagem}">
                        <div class="conteudo">
                            <div class="conteudo_postagem">
                                <div class="titulo">${post.tituloPostagem}</div>
                                <div class="descricao"><strong>Descrição:</strong> <p>${post.descricaoPostagem}</p></div>
                            </div>
                            <div class="curtidaDiv">
                                <button onclick="curtidasPostagem(this, '${post.idPostagem}', '${idUsuarioSessao}', '${post.fkUsuario}')" id="btn_curtida" data-id-postagem="${post.idPostagem}"><img src="../assets/img/icon/deslike.svg" alt="" style="width: 30px; height: 30px"></button>
                                <span id="qtdCurtidas-${post.idPostagem}">0</span><br>
                            </div>
                            <button onclick="comentarios(this); comentariosRealizados(this, '${post.idPostagem}')" class="abrirComentarios"><img src="../assets/img/icon/TopicBranco.svg" style="width: 30px; height: 30px"></button>
                            <button onclick="apagarComentariosDaPostagem('${post.idPostagem}')" class="deletar"><img src="../assets/img/Delete.svg" alt="" style="width: 30px; height: 30px"></button>
                        </div>
                    </div>
                    <div class="boxComentarios">
                        <div style="widht: 100%; heigth: 100%; display: flex; align-items: center; justify-content: center;">

                        <img src="../assets/img/icon/carregamento.gif" alt="" style="width: 30px; height: 30px"> 
                        </div>
                    </div>
                </div>
            `;

            quantidadeDeCurtidas(post.idPostagem);




            });
        }).catch(
            function (erro) {
                console.log("Nenhuma postagem")
            }
        );
}













// Esta função será chamada quando o botão "imagem selecionada" for clicado
function imagemSelecionada() {

    var tituloVar = inputTitulo.value
    var descricaoVar = inputDescricao.value
    var usuarioVar = sessionStorage.ID_USUARIO

    if (tituloVar == "" ||
        descricaoVar == ""
    ) {
        console.log("Preencha todos os campos!");
        return false;
    } else {
        console.log("todos os campos preenchidos")
    }


    var fileInput = document.getElementById('fileInput');
    var div_img = document.getElementById('div_img');

    if (fileInput.files && fileInput.files[0]) {
        var file = fileInput.files[0];

        var reader = new FileReader();
        reader.onload = function (e) {
            var base64Image = e.target.result;

            // Exibe a imagem
            div_img.innerHTML = `<img src="${base64Image}" style="width: 100px; height: 100px;">`;

            // Aqui você já pode enviar para o servidor
            console.log("Base64 da imagem:", base64Image);
            // Exemplo de envio com fetch:

            console.log("Base64 da imagem:", tituloVar + " descricao: " + descricaoVar + " usuarioId: " + usuarioVar);

            fetch("/postagem/realizarPostagem", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // crie um atributo que recebe o valor recuperado aqui
                    // Agora vá para o arquivo routes/usuario.js
                    tituloServer: tituloVar,
                    descricaoServer: descricaoVar,
                    usuarioServer: usuarioVar,
                    imagemServer: base64Image

                }),
            })
                .then(function (resposta) {
                    console.log("resposta: ", resposta);

                    if (resposta.ok) {
                        console.log("postagem realizada")
                        tituloVar = "";
                        descricaoVar = "";
                        div_img.innerHTML = "";
                        setTimeout(() => {
                            atualizarPagina();
                        }, 500);

                    } else {
                        throw "Houve um erro ao tentar realizar o postagem!";
                    }
                })
                .catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`);
                });

        };
        reader.readAsDataURL(file); // Lê como base64 (Data URL)
    } else {
        div_img.innerHTML = "Nenhuma imagem selecionada.";
    }
}







function curtidasPostagem(curtir, postagem, usuario, donoPostagem) {

    var usuarioVar = usuario;
    var postagemVar = postagem;
    var donoPostagemVar = donoPostagem;
    const clicado = curtir.classList.toggle("clicado")

    if (clicado) {
        verificacao = "v";
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
                                        botao.style.backgroundColor = "#f00"; // ou use btnCurtida(botao);
                                    } else {
                                        botao.style.backgroundColor = "#fff";
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
                mensagem_carregamento.innerHTML = "apagando postagem... aguarde..."
                setTimeout(() => {
                    mensagem_carregamento.innerHTML = ""
                    atualizarPagina();
                }, 1000);
            } else {
                console.error("Erro ao apagar as postagem.");
            }
        })
        .catch((erro) => {
            console.log("Não foi possível apagar a postagem:", erro);
        });
}





