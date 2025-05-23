    var idUsuarioSessao = sessionStorage.ID_USUARIO;


    function mostrarImagem() {
        const fileInput = document.getElementById('fileInput');
        const div_img = document.getElementById('div_img');

        if (fileInput.files && fileInput.files[0]) {
            const imagemURL = URL.createObjectURL(fileInput.files[0]);
            div_img.innerHTML = `<img src="${imagemURL}" style="width: 200px; height: auto;">`;
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

            const container = document.getElementById("postagens");

            container.innerHTML += "";

            dados.forEach(post => {//ele passa por cada postagem com o forEach
                container.innerHTML += `
                <button onclick="apagarComentariosDaPostagem('${post.idPostagem}')">apagar</button>
                <div class="postagem" style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
                    <div class="imagem"><img src="${post.imagemPostagem}" style="width: 200px; height: 200px;" ></div>
                    <div class="titulo"><strong>Título:</strong> ${post.tituloPostagem}</div>
                    <div class="descricao"><strong>Descrição:</strong> ${post.descricaoPostagem}</div>
                    <button onclick="curtidasPostagem(this, '${post.idPostagem}', '${idUsuarioSessao}', '${post.fkUsuario}')" id="btn_curtida" data-id-postagem="${post.idPostagem}">curtir</button>
                    <span id="qtdCurtidas-${post.idPostagem}">0</span><br>
                    <button onclick="comentarios(this); comentariosRealizados(this, '${post.idPostagem}')">abrir comentário</button>
                    <input type="text"><button onclick="realizarComentario(this, '${post.idPostagem}')">></button>
                    <div class="boxComentarios" style="padding: 15px; border-radius: 10px; margin: 10px; background: #d3d3d3; display: none; width: 400px; overflow: auto;">
                        <p>Nome User</p>    
                        <p>COMENTARIO...</p>    
                    </div>
                </div>
            `;
            });
        }).catch(
                function (erro) {
                    console.log("Nenhuma postagem")
                }
            );







    function comentarios(botao) {

        const divPostagem = botao.parentElement;

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

        const divPostagem = botao.parentElement;
        const box = divPostagem.querySelector(".boxComentarios");



        fetch(`/comentarios/comentarioRealizado?idPostagem=${armazenarComentario}`, {
            method: "GET",
        }).then(res => res.json())
            .then(usuario => {
                box.innerHTML = "";
                usuario.forEach(post => {
                    box.innerHTML += `
                    <p>${post.nomePerfilUsuario}</p>
                    <p>Data e Hora: ${post.dtInteracao}</p>
                    <p style="border-bottom: 1px solid black; margin-bottom: 40px">${post.descricaoComentario}</p>
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




    function atualizarPagina(){
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
                <button onclick="apagarComentariosDaPostagem('${post.idPostagem}')">apagar</button>
                <div class="postagem" style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
                    <div class="imagem"><img src="${post.imagemPostagem}" style="width: 200px; height: 200px;" loading="lazy"></div>
                    <div class="titulo"><strong>Título:</strong> ${post.tituloPostagem}</div>
                    <div class="descricao"><strong>Descrição:</strong> ${post.descricaoPostagem}</div>
                    <button onclick="comentarios(this); comentariosRealizados(this, '${post.idPostagem}')">abrir comentário</button>
                    <div class="boxComentarios" style="padding: 15px; border-radius: 10px; margin: 10px; background: #d3d3d3; display: none; width: 400px; overflow: auto;">
                        <p>Nome User</p>    
                        <p>COMENTARIO...</p>    
                    </div>
                </div>
            `;





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
                            tituloVar.value = "";
                            descricaoVar.value = "";
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



    function valorInput(input) {
        return input.value;
    }
    function realizarComentario(botao, idPostagem) {
        var input = botao.previousElementSibling; // pega o input que vem antes do botão é obrigatório que ele esteja antes.
        var comentarioVar = valorInput(input);
        var usuarioVar = idUsuarioSessao;
        var postagemVar = idPostagem

        console.log("comentario: "+ comentarioVar + " postagem: " + postagemVar + " usuario: " + usuarioVar);


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



    function curtidasPostagem(curtir, postagem, usuario, donoPostagem) {

        var usuarioVar = usuario;
        var postagemVar = postagem;
        var donoPostagemVar = donoPostagem;
        var verificacaoVar = "";
        const clicado = curtir.classList.toggle("clicado")
        
        if (clicado) {
            verificacao = "v";
            curtir.style.backgroundColor = "#f00";
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
            curtir.style.backgroundColor = "#fff";
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



    function deletarPostagem(idPostagem){
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




    
