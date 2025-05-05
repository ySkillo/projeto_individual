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


CREATE TABLE tbCurtidas(
	fkUsuarioSelecionado INT,
    fkUsuarioPostagem INT,
    fkPostagemSelecionada INT,
	dtComentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    constraint fkUsuarioSelecionado foreign key (fkUsuarioSelecionado)
		references tbUsuario(idUsuario),
	constraint fkUsuarioPostagem foreign key (fkUsuarioPostagem)
		references tbPostagem(fkUsuario),
	constraint fkPostagem foreign key (fkPostagemSelecionada)
		references tbPostagem(idPostagem)
);

SELECT COUNT(fkPostagemSelecionada) FROM tbCurtidas
		WHERE fkPostagemSelecionada = 5;

    -- SELECT COUNT(*) FROM produtos;
	-- fazer contagem


CREATE TABLE tbComentarios(
	idComentario INT PRIMARY KEY AUTO_INCREMENT,
	descricaoComentario VARCHAR(255),
    dtInteracao  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fkPostagem INT,
    fkUsuario INT,
    constraint fkPostagens foreign key (fkPostagem) 
		references tbPostagem(idPostagem),
	constraint fkUsuarios foreign key (fkUsuario) 
		references tbUsuario(idUsuario)
);


select * from tbUsuario;
select * from tbPostagem;
select * from tbCurtidas;
select * from tbComentarios;




INSERT INTO tbUsuario (nomeUsuario, nomePerfilUsuario, emailUsuario, cpfUsuario, senhaUsuario, fotoPerfil) VALUES
('Ana Souza', 'AnaTech', 'ana@gmail.com', '123.456.789-00', 'senha123', 'foto_ana.png'),
('Carlos Lima', 'CLima', 'carlos@gmail.com', '234.567.890-11', 'senha456', 'foto_carlos.png'),
('Beatriz Rocha', 'BiaRocha', 'bia@gmail.com', '345.678.901-22', 'senha789', 'foto_bia.png'),
('Daniel Alves', 'DaniDev', 'daniel@gmail.com', '456.789.012-33', 'senha321', 'foto_daniel.png'),
('Fernanda Costa', 'FeCosta', 'fernanda@gmail.com', '567.890.123-44', 'senha654', 'foto_fernanda.png');


INSERT INTO tbPostagem (tituloPostagem, descricaoPostagem, imagemPostagem, fkUsuario) VALUES
('Viagem ao Rio', 'Compartilhando minha viagem ao Rio de Janeiro', 'imagem1.png', 1),
('Nova receita', 'Aprenda a fazer um bolo de cenoura delicioso', 'imagem2.png', 2),
('Dica de leitura', 'Recomendo o livro "A Sutil Arte de Ligar o F*da-se"', 'imagem3.png', 3),
('Setup Gamer', 'Mostrando meu novo setup', 'imagem4.png', 4),
('Paisagem Incrível', 'Foto que tirei na montanha', 'imagem5.png', 5);


INSERT INTO tbCurtidas (fkUsuarioSelecionado, fkUsuarioPostagem, fkPostagemSelecionada) VALUES
(1, 2, 2),
(2, 3, 3),
(3, 1, 1),
(3, 1, 1),
(3, 1, 1),
(3, 1, 1),
(4, 5, 5),
(5, 4, 4);



INSERT INTO tbComentarios (descricaoComentario, fkPostagem, fkUsuario) VALUES
('Que lugar lindo!', 1, 2),
('Vou testar essa receita!', 2, 1),
('Já li esse livro, muito bom.', 3, 4),
('Top demais seu setup!', 4, 5),
('Essa paisagem é surreal!', 5, 3);






