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
    dtInteracao  DATETIME DEFAULT CURRENT_TIMESTAMP,
	fkPostagem INT,
    fkUsuario INT,
    constraint fkPostagens foreign key (fkPostagem) 
		references tbPostagem(idPostagem),
	constraint fkUsuarios foreign key (fkUsuario) 
		references tbUsuario(idUsuario)
);


select * from tbUsuario;
select * from tbPostagem;
select * from tbComentarios;



INSERT INTO tbUsuario (nomeUsuario, nomePerfilUsuario, emailUsuario, cpfUsuario, senhaUsuario, fotoPerfil) VALUES
('João Silva', 'joaosilva', 'joao@gmail.com', '123.456.789-00', 'senha123', 'foto1.jpg'),
('Maria Souza', 'mariasz', 'maria@gmail.com', '987.654.321-00', 'senha456', 'foto2.jpg'),
('Lucas Lima', 'lucaslim', 'lucas@gmail.com', '456.789.123-00', 'senha789', 'foto3.jpg'),
('Ana Costa', 'anac', 'ana@gmail.com', '321.654.987-00', '123senha', 'foto4.jpg'),
('Carlos Mendes', 'carlitos', 'carlos@gmail.com', '741.852.963-00', 'abc123', 'foto5.jpg'),
('Bruna Rocha', 'bruninha', 'bruna@gmail.com', '159.753.486-00', 'bruna123', 'foto6.jpg'),
('Ricardo Alves', 'ricardao', 'ricardo@gmail.com', '258.147.369-00', 'senha789', 'foto7.jpg'),
('Juliana Dias', 'julydias', 'juliana@gmail.com', '369.258.147-00', 'juliana456', 'foto8.jpg'),
('Paulo Henrique', 'phenrique', 'paulo@gmail.com', '111.222.333-44', 'ph123', 'foto9.jpg'),
('Camila Martins', 'camimartins', 'camila@gmail.com', '555.666.777-88', 'cami321', 'foto10.jpg');



INSERT INTO tbPostagem (tituloPostagem, descricaoPostagem, imagemPostagem, fkUsuario) VALUES
('Viagem ao Rio', 'Relato da minha viagem ao Rio de Janeiro!', 'img1.jpg', 1),
('Receita de Bolo', 'Confira essa receita deliciosa de bolo de cenoura', 'img2.jpg', 2),
('Treino em Casa', 'Dicas para treinar em casa.', 'img3.jpg', 3),
('Review de Série', 'Minha opinião sobre uma nova série da Netflix.', 'img4.jpg', 4),
('Dica de Estudo', 'Métodos de estudo que funcionam comigo.', 'img5.jpg', 5),
('Tecnologia Nova', 'Novo lançamento de smartphone comentado.', 'img6.jpg', 6),
('Projeto Social', 'Relato do projeto que participei.', 'img7.jpg', 7),
('Look do Dia', 'Minha roupa preferida da semana.', 'img8.jpg', 8),
('Setup Gamer', 'Meu setup de games atualizado.', 'img9.jpg', 9),
('Passeio em Família', 'Domingo no parque com a família.', 'img10.jpg', 10);


INSERT INTO tbComentarios (descricaoComentario, fkPostagem, fkUsuario) VALUES
('Que lugar lindo!', 1, 2),
('Amo essa receita!', 2, 4),
('Faço esse treino também!', 3, 5),
('Concordo com você sobre a série.', 4, 1),
('Vou testar essa dica hoje.', 5, 3),
('Gostei do celular novo!', 6, 7),
('Esse projeto é inspirador!', 7, 6),
('Adorei o look!', 8, 9),
('Seu setup está top!', 9, 8),
('Passeios assim são tudo!', 10, 10);

SELECT c.idComentario, c.descricaoComentario, c.dtInteracao,
 p.idPostagem, u.nomePerfilUsuario, u.idUsuario FROM tbComentarios as c 
 JOIN tbPostagem as p
on c.fkPostagem = p.idPostagem
JOIN tbUsuario as u
 on c.fkUsuario = u.idUsuario
 WHERE c.fkPostagem = 10 and c.fkUsuario = 10;


