# Space Jam — Backend

Repositório back-end do **Space Jam**, sistema de gestão de ligas de basquete, desenvolvido com **Node.js** e **Express**. A API persiste os dados no **MongoDB** via **Mongoose** e expõe recursos para times, jogadores, jogos e participações.

## Tecnologias

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/) 5
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [CORS](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)

## Arquitetura

O projeto segue uma organização em camadas:

```
space-jam-backend/
├── app.js              # Ponto de entrada da aplicação
├── config/
│   └── dbConnect.js    # Conexão com o MongoDB
├── controllers/        # Tratamento de requisições HTTP
├── models/             # Schemas e modelos Mongoose
├── routes/             # Definição das rotas
├── services/           # Regras de negócio e acesso aos dados
├── *.json              # Dados de exemplo (seed)
└── .env.example        # Variáveis de ambiente de referência
```

## Pré-requisitos

- Node.js 18 ou superior
- Instância do MongoDB (local ou Atlas)

## Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd space-jam-backend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e defina a string de conexão do banco:

```env
DB_CONNECTION_STRING=sua_string_de_conexao_mongodb
```

## Executando

Modo desenvolvimento (com recarga automática via nodemon):

```bash
npm run dev
```

A API ficará disponível em `http://localhost:8000`.

## Endpoints

Base URL: `http://localhost:8000`

### Times — `/teams`

| Método   | Rota    | Descrição                      |
| -------- | ------- | ------------------------------ |
| `GET`    | `/`     | Lista todos os times           |
| `GET`    | `/find` | Busca time por nome (`?name=`) |
| `GET`    | `/:id`  | Retorna um time pelo ID        |
| `POST`   | `/`     | Cria um novo time              |
| `PATCH`  | `/:id`  | Atualiza um time               |
| `DELETE` | `/:id`  | Remove um time                 |

### Jogadores — `/players`

| Método   | Rota    | Descrição                                         |
| -------- | ------- | ------------------------------------------------- |
| `GET`    | `/`     | Lista todos os jogadores                          |
| `GET`    | `/find` | Busca por posição favorita (`?favoritePosition=`) |
| `GET`    | `/:id`  | Retorna um jogador pelo ID                        |
| `POST`   | `/`     | Cria um novo jogador                              |
| `PATCH`  | `/:id`  | Atualiza um jogador                               |
| `DELETE` | `/:id`  | Remove um jogador                                 |

### Jogos — `/games`

| Método   | Rota    | Descrição                     |
| -------- | ------- | ----------------------------- |
| `GET`    | `/`     | Lista todos os jogos          |
| `GET`    | `/find` | Busca por status (`?status=`) |
| `GET`    | `/:id`  | Retorna um jogo pelo ID       |
| `POST`   | `/`     | Cria um novo jogo             |
| `PATCH`  | `/:id`  | Atualiza um jogo              |
| `DELETE` | `/:id`  | Remove um jogo                |

Status aceitos: `aberto`, `encerrado`.

### Participações — `/participations`

| Método   | Rota    | Descrição                                             |
| -------- | ------- | ----------------------------------------------------- |
| `GET`    | `/`     | Lista todas as participações                          |
| `GET`    | `/find` | Filtra por IDs (`?gameId=`, `?teamId=`, `?playerId=`) |
| `GET`    | `/:id`  | Retorna uma participação pelo ID                      |
| `POST`   | `/`     | Cria uma nova participação                            |
| `PATCH`  | `/:id`  | Atualiza uma participação                             |
| `DELETE` | `/:id`  | Remove uma participação                               |

## Modelos de dados

### Jogador (`player`)

- `name`, `email`, `phone`, `favorite_position`
- `total_stats`: estatísticas acumuladas (`points`, `assists`, `rebounds`, `steals`, `blocks`)

### Time (`team`)

- `name`

### Jogo (`game`)

- `location`, `status` (`aberto` | `encerrado`)
- `start_date`, `end_date`, `total_value`
- `player_limit`: `{ min, max }`
- `matches`: partidas com times, placares, resultado e datas

### Participação (`participation`)

- `game_id`, `team_id`, `player_id`
- `confirmation_date`
- `payment`: `{ completed, amount_paid, payment_date }`
- `match_stats`: estatísticas do jogador na partida

## Dados de exemplo

O repositório inclui arquivos JSON com dados iniciais para referência:

- `players.json`
- `teams.json`
- `games.json`
- `participations.json`
