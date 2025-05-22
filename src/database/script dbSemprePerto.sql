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

CREATE TABLE tbSeguidor(
	idSeguidor INT,
    fkUsuarioSeguido INT,
	 constraint primary key (fkUsuarioSeguido, idSeguidor),
        foreign key (fkUsuarioSeguido) references tbUsuario(idUsuario)
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
    constraint primary key(fkUsuarioSelecionado, fkPostagemSelecionada, fkUsuarioPostagem),
	dtComentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    curtida char(1)
		constraint chkCurtida check (curtida IN('v','f')),
    constraint fkUsuarioSelecionado foreign key (fkUsuarioSelecionado)
		references tbUsuario(idUsuario),
	constraint fkUsuarioPostagem foreign key (fkUsuarioPostagem)
		references tbPostagem(fkUsuario),
	constraint fkPostagem foreign key (fkPostagemSelecionada)
		references tbPostagem(idPostagem)
);

SELECT COUNT(fkPostagemSelecionada) FROM tbCurtidas
		WHERE fkPostagemSelecionada = ?;

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

INSERT INTO tbUsuario (nomeUsuario, nomePerfilUsuario, emailUsuario, cpfUsuario, senhaUsuario, fotoPerfil) VALUES
('João Silva', 'joaos', 'joao@email.com', '123.456.789-00', 'senha123', 'foto1.jpg'),
('Maria Oliveira', 'mariao', 'maria@email.com', '987.654.321-00', 'senha456', 'foto2.jpg'),
('Carlos Souza', 'carloss', 'carlos@email.com', '321.654.987-00', 'senha789', 'foto3.jpg'),
('Ana Costa', 'anac', 'ana@email.com', '654.987.321-00', 'senhaabc', 'foto4.jpg'),
('Pedro Lima', 'pedrol', 'pedro@email.com', '789.123.456-00', 'senhadef', 'foto5.jpg');


select * from tbUsuario;
select * from tbSeguidor;
select * from tbPostagem;
select * from tbCurtidas;
select * from tbComentarios;

select count(fkUsuarioSeguido)from tbSeguidor
	where fkUsuarioSeguido = 2;

 -- idSeguidor INT
  -- fkUsuarioSeguido INT
select  count(idSeguidor) from tbSeguidor
	where fkUsuarioSeguido = 1;



































INSERT INTO tbCurtidas (fkUsuarioSelecionado, fkUsuarioPostagem, fkPostagemSelecionada) VALUES
(2, 1, 2), (3, 1, 2), (4, 1, 2), (5, 1, 2), (6, 2), (7, 1, 2), (8, 1, 2), (9, 1, 2), (10, 1, 2),
(11, 1, 2), (12, 1, 2), (13, 1, 2), (14, 1, 2), (15, 1, 2), (16, 1, 2), (17, 1, 2), (18, 1, 2), (19, 1, 2), (20, 1, 2),
(21, 1, 2), (22, 1, 2), (23, 1, 2), (24, 1, 2), (25, 1, 2), (26, 1, 2), (27, 1, 2), (28, 1, 2), (29,1,  2), (30, 1, 2),
(31, 1, 2), (32, 1, 2), (33, 1, 2), (34, 1, 2), (35, 1, 2);

-- Postagem 3 - 30 curtidas
INSERT INTO tbCurtidas (fkUsuarioSelecionado, fkUsuarioPostagem, fkPostagemSelecionada) VALUES
(36, 1, 3), (37, 1, 3), (38, 1, 3), (39, 1, 3), (40, 1, 3), (41, 1, 3), (42, 1, 3), (1, 3, 1, 3), (44, 1, 3), (45, 1, 3),
(46, 1, 3), (47, 1, 3), (48, 1, 3), (49, 1, 3), (50, 1, 3), (51, 1, 3), (52, 1, 3), (1, 3, 1, 3), (54, 1, 3), (55, 1, 3),
(56, 1, 3), (57, 1, 3), (58, 1, 3), (59, 1, 3), (60, 1, 3), (61, 1, 3), (62, 1, 3), (1, 3, 1, 3), (64, 1, 3), (65, 1, 3);