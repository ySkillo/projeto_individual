show databases;

create database dbSemprePerto;
drop database dbSemprePerto;

use dbSemprePerto;

CREATE TABLE tbUsuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nomeUsuario VARCHAR(45) NOT NULL,	
    nomePerfilUsuario VARCHAR(45),
    emailUsuario VARCHAR(45) NOT NULL UNIQUE,
    cpfUsuario CHAR (14) NOT NULL UNIQUE,
    senhaUsuario VARCHAR(30),
	fotoPerfil LONGTEXT
);

CREATE TABLE tbPostagem(
	idPostagem INT PRIMARY KEY AUTO_INCREMENT,
	tituloPostagem VARCHAR(35),
    descricaoPostagem VARCHAR(255),
	imagemPostagem LONGTEXT,
	fkUsuario INT,
	constraint fkUsuario foreign key (fkUsuario)
		references tbUsuario(idUsuario)
);

CREATE TABLE tbComentarios(
	idComentario INT PRIMARY KEY AUTO_INCREMENT,
	descricaoComentario VARCHAR(255),
	fkPostagem INT,
    constraint fkPostagens foreign key (fkPostagem) 
		references tbPostagem(idPostagem)
);

CREATE TABLE tbUsuariosComent(
	compUsuarioAssociados INT,
    compComentarioAssociados INT,
    dtInteracao  DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (compUsuarioAssociados, compComentarioAssociados),
	constraint fkUsuarioComp foreign key
		(compUsuarioAssociados) references tbUsuario(idUsuario),
	constraint fkComentarioComp foreign key 
		(compComentarioAssociados) references tbComentarios(idComentario)
);



INSERT INTO tbUsuario (nomeUsuario, nomePerfilUsuario, emailUsuario, cpfUsuario, senhaUsuario, fotoPerfil)
VALUES 
('João Silva', 'joao_silva', 'joao.silva@email.com', '123.456.789-00', 'senha123', 'foto1.jpg'),
('Maria Oliveira', 'maria_oliveira', 'maria.oliveira@email.com', '987.654.321-00', 'senha456', 'foto2.jpg'),
('Carlos Souza', 'carlos_souza', 'carlos.souza@email.com', '111.222.333-44', 'senha789', 'foto3.jpg');

INSERT INTO tbPostagem (tituloPostagem, descricaoPostagem, imagemPostagem, fkUsuario)
VALUES
('Meu primeiro post', 'Este é o conteúdo do meu primeiro post', 'imagem1.jpg', 1),
('Dicas de programação', 'Aqui estão algumas dicas de programação para iniciantes', 'imagem2.jpg', 2),
('Viagem para Paris', 'Compartilhando algumas fotos da minha viagem para Paris', 'imagem3.jpg', 3);

INSERT INTO tbComentarios (descricaoComentario, fkPostagem)
VALUES
('Muito interessante, gostei!', 1),
('Ótimas dicas, vou tentar! Obrigada!', 2),
('Paris é incrível, espero visitar em breve!', 3);

INSERT INTO tbUsuariosComent (compUsuarioAssociados, compComentarioAssociados)
VALUES
(2, 1),
(3, 2),
(1, 3);

select * from tbUsuario;
select * from tbPostagem;
select * from tbComentarios;
select * from tbUsuariosComent;