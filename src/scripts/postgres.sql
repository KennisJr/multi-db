DROP TABLE IF EXISTS TB_LIVROS;
CREATE TABLE TB_LIVROS (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NOME TEXT NOT NULL,
    AUTOR TEXT NOT NULL
)

INSERT INTO TB_LIVROS (NOME,AUTOR)
VALUES 
    ('The Beating of His Wings','Paul Hoffman'),
    ('É assim que acaba','XColleen HooverX'),
    ('O pequeno príncipe', 'Antoine de Saint-Exupéry')

-- read
SELECT * FROM TB_LIVROS
SELECT * FROM TB_LIVROS WHERE NOME = 'O pequeno príncipe'

--update
UPDATE TB_LIVROS
SET NOME = 'Colleen Hoover'
WHERE ID = 2

--delete
DELETE FROM TB_LIVROS WHERE ID = 2