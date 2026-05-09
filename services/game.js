const fs = require('fs')
const gamesFilePath = "games.json";

async function readGames () {
    const fileExists = fs.existsSync(gamesFilePath);
    if (!fileExists) {
        fs.writeFileSync(gamesFilePath, '[]', 'utf-8');
    }
    return JSON.parse(fs.readFileSync(gamesFilePath, 'utf-8'));
}

async function getGames() {
    const games = await readGames();
    return games;
}

async function getGameById(id) {
    const games = await readGames();
    return games.find(game => game.id === id);
}

async function createGame(newGame) {
    const games = await readGames();
    const gamesLength = games.length;
    const newGameId = gamesLength + 1;
    games.push({
        id: newGameId,
        ...newGame
    });
    fs.writeFileSync(gamesFilePath, JSON.stringify(games, null, 2), 'utf-8');
}

async function updateGame(gameProperties, id) {
  let games = await getGames();
  const index = games.findIndex((game) => game.id == id);
  if (index === -1) {
    throw  { status: 404, message: 'Jogo não encontrado' };
  }
  Object.assign(games[index], gameProperties);
  await fs.promises.writeFile(gamesFilePath, JSON.stringify(games, null, 2), 'utf-8');
}

async function deleteGame(id) {
  let games = await getGames();
  const gamesFiltered = games.filter((game) => game.id != id);
  if (games.length === gamesFiltered.length) {
    throw { status: 404, message: 'Jogo não encontrado' };
  }
  await fs.promises.writeFile(gamesFilePath, JSON.stringify(gamesFiltered, null, 2), 'utf-8');
}

module.exports = {
    readGames,
    getGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
}