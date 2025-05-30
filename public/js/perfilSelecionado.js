
    var idUsuarioSessao = sessionStorage.ID_USUARIO;
    var usuarioSelecionado = sessionStorage.NOME_PERFIL_USUARIO;

    var perfilUsuario = usuarioSelecionado;
    
    fetch(`/postagem/usuarioSelecionado?nomePerfilUsuario=${encodeURIComponent(usuarioSelecionado)}`, {
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
                    <div class="postagem" style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
                        <div class="nome"><strong>Usuário:</strong> ${post.nomeUsuario}</div>
                        <div class="imagem"><img src="${post.imagemPostagem}" style="width: 200px; height: 200px;" loading="lazy"></div>
                        <div class="titulo"><strong>Título:</strong> ${post.tituloPostagem}</div>
                        <div class="descricao"><strong>Descrição:</strong> ${post.descricaoPostagem}</div>
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
                    postagens.innerHTML = "";
                    postagens.innerHTML += `
                        <p>Nenhuma postagem</p>
                    `;
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




        //pegar valor do input de comentario.
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




