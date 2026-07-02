Como modelou o banco e por quê;
Banco modelado separando entidades distintas: responsável, posto, endereço e combustível; com tabela de apoio para posto e combustível. Também foi criado um enum para o status do posto e indexes básicos de id.

responsável pode ter varias estacões.
endereço pode ser reutilizado por outras tabelas
combustível tem relação de many-to-many com estacão, por isso uso da tabela de apoio.
CNPJ e CPF são únicos e podem identificar entidades

Como tratou importação, validação e duplicidades;
importação é primeiro verificado usando multer para checar tamanho e presença e depois usando middleware para checar extensão se o arquivo existe.
Validação e tipagem feita usando zod
Salvamento usando Batchs, usando Map com keys para evitar duplicadas dentro do array
linhas invalidas são retornadas para o usuário com a mensagem de erro e não são importadas.
uso de "ON CONFLICT" para evitar salvamento duplicados

Como pensou a exportação;
exportação feita utilizando Transform para fazer o stream das linhas conforme forem buscadas no banco de dados, isso evitar carregar todos os item na memoria

Quais trade-offs assumiu;
não utilizar migrações e usar o database.sql no inicio da aplicação
depender da validação do Zod e não usar constraints no banco de dados

O que faria diferente se tivesse mais tempo.
fazer verificação mais precisa de campos como:CPF CNPJ, CEP e UF
testes para o parse do CSV e validação
implementar logging mais preciso
Adicionar paginacao nas tabelas
loading na hora de fazer upload e download
