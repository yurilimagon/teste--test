6.Exiba em 4 colunas sendo elas respectivamente: o número do pedido, o nome do comprador, o nome do vendedor e o valor total da nota fiscal. 
Liste os registros em ordem ascendente levando em consideração a coluna número.
(6 Pontos)


SELECT n.numero, c.nome, v.nome, i.total FROM
(SELECT numero AS NUM_NF FROM notas_fiscais) n, (SELECT nome FROM tabela_de_clientes) c, 
(SELECT nome FROM tabela_de_vendedores) v, (SELECT SUM(preco*quantidade) AS total FROM itens_notas_fiscais)di
WHERE n.cpf = c.cpf AND n.matricula = v.matricula AND n.numero = i.numero;


SELECT n.numero, c.nome AS comprador, v.nome AS vendedor,  
(SELECT SUM(i.preco*i.quantidade) FROM itens_notas_fiscais i 
WHERE n.numero = i.numero) AS total FROM notas_fiscais n
INNER JOIN tabela_de_clientes c ON(n.CPF = c.CPF) 
INNER JOIN tabela_de_vendedores v ON(n.matricula = v.matricula) ORDER BY n.numero;


7.Exiba todas as informações da tabela itens_notas_fiscais d qual não possua os códigos dos produtos 1078680, 1013793, 1101035, 520380 e 520380. 
Ordene em ordem decrescente considerando a coluna numero e a coluna quantidade.
(4 Pontos)


SELECT * FROM itens_notas_fiscais
WHERE NOT codigo_do_produto IN ('1078680', '1013793', '1101035', '520380')
ORDER BY codigo_do_produto, quantidade DESC;


8.Considerando TODAS as vendas, exiba o sabor e a quantidade do produto mais vendido.
(6 Pontos)



9.Crie uma query que exiba o mês-ano, o número da nota e o valor do imposto pago por esta nota. Considere o valor total da nota para calcular o imposto. 
Ordene os registros por data crescente.
(4 Pontos)

SELECT n.data_venda, n.numero, 
(SELECT SUM(i.preco*i.quantidade) FROM itens_notas_fiscais i 
WHERE n.numero = i.numero) AS total FROM notas_fiscais n

10.Considerando todas as vendas, exiba a quantidade média de vendas do produtos de código 1096818, 826490, 1004327 e 229900. Exiba apesar o valor inteiro 
arredondando o valor para +1 caso a casa decimal >=5, ou seja, caso o valor retornado seja 12,5, o valor deve ser arredondado para 13, caso o valor seja 
12,4 o valor deve ser arredondado para 12.
(4 Pontos)

SELECT ROUND(AVG(quantidade), 0) AS media 
FROM itens_notas_fiscais
WHERE codigo_do_produto IN('1096818','826490','1004327','229900');


11.Considerando a data de hoje, exiba o nome do vendedor e o total de dias o qual ele trabalha na empresa. Ordene do(a) vendedor(a) mais antigo(a) para o(a) 
mais recente. OBS: dias são inteiros
(4 Pontos)

SELECT C.NOME AS NOME_VENDEDOR,
(SELECT COUNT(DISTINCT(V.DATA_VENDA)) 
FROM NOTAS_FISCAIS V WHERE C.MATRICULA = V.MATRICULA) AS DIAS_TRABALHADOS 
FROM TABELA_DE_VENDEDORES C
ORDER BY C.DATA_ADMISSAO;

SELECT C.NOME AS NOME_VENDEDOR,
SELECT nome, DATEDIFF ( DAY , v.data_admissao , GETDATE() ) AS dias_trab
FROM tabela_de_vendedores;