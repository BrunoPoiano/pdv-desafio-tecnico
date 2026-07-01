# pdv desafio tecnico

## Descrição

Desenvolvido em TypeScript com Node.js e Vue.js. App para gerenciar informações de postos de combustíveis, incluindo importação e exportação de dados em formato CSV, além de integração com um banco de dados PostgreSQL.

## Stack

- Vue.js
- Node.js
- PostgreSQL
- Docker (opcional, para execução em container)

## Uso

### Docker

#### Docker Compose (recomendado)

Docker images:
[frontend](https://hub.docker.com/r/brunopoiano/pdv-test-frontend)
[backend](https://hub.docker.com/r/brunopoiano/pdv-test-backend)

```bash
services:
  frontend:
    image: docker.io/brunopoiano/pdv-test-frontend
    ports:
      - "5150:80"
    depends_on: [backend]

  backend:
    image: docker.io/brunopoiano/pdv-test-backend
    container_name: backend
    ports:
      - "3000:3000"
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      APP_VERSION: production
      DB_HOST: postgres
      DB_PORT: 5432
      DB_NAME: app_db
      DB_USER: admin
      DB_PASSWORD: password

  postgres:
    image: postgres:17
    container_name: postgres-db
    restart: unless-stopped
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
      POSTGRES_DB: app_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin -d app_db"]
      interval: 5s
      timeout: 5s
      retries: 10

volumes:
  postgres_data:

```

#### Apartir do codigo fonte

1. Clone o repositório:

   ```bash
   git clone https://github.com/BrunoPoiano/pdv-desafio-tecnico.git
   cd pdv-desafio-tecnico/backend
   ```

2. Construa a imagem Docker:

   ```bash
   docker compose build --no-cache
   ```

3. Execute o container:
   ```bash
   docker compose up -d
   ```

### Desenvolvimento

#### Backend

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

#### Frontend

1. Clone o repositório:

   ```bash
   cd pdv-desafio-tecnico/frontend
   ```

2. Instale as dependências:

   ```bash
   bun install
   ```

3. Inicie o servidor:

   ```bash
   bun dev
   ```

4. Acesse a API em `http://localhost:5150`.
