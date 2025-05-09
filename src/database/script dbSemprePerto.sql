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



