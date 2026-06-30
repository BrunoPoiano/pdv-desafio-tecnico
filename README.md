# Backend - pdv-desafio-tecnico

## Descrição

Este é o backend do projeto "pdv-desafio-tecnico", desenvolvido em TypeScript com Node.js e Vue.js. Ele fornece uma API para gerenciar informações de postos de combustíveis, incluindo importação e exportação de dados em formato CSV, além de integração com um banco de dados PostgreSQL.

## Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL
- Docker (opcional, para execução em container)

## Docker

Para executar o app em um container Docker:

1. Construa a imagem Docker:

   ```bash
   docker compose build --no-cache
   ```

2. Execute o container:
   ```bash
   docker compose up -d
   ```

## Desenvolvimento

### Backend

1. Clone o repositório:

   ```bash
   git clone https://github.com/BrunoPoiano/pdv-desafio-tecnico.git
   cd pdv-desafio-tecnico/backend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   - Copie o arquivo `.env.exemple` para `.env`:
     ```bash
     cp .env.exemple .env
     ```

4. Inicie o servidor:

   ```bash
   npm run dev
   ```

5. Acesse a API em `http://localhost:3000`.
