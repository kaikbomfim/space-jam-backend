const gamesService = require('../services/game');

const gameFields = [
    'location',
    'status',
    'matches',
    'start_date',
    'total_value',
    'end_date',
    'player_limit'
];
const playerLimitFields = [
    'max', 
    'min'
];
const matchesFields = [
    'id',
    'team_1',
    'team_2',
    'end_date',
    'team_1_id',
    'team_2_id',
    'result',
    'start_date'
];
const teamFields = [
    'name', 
    'total_score'
];


async function getGames(req, res) {
    try {
        const games = await gamesService.getGames();
        res.json(games);
    } catch (error) {
        res.status(error.status ?? 500).json({ message: error.message ?? 'Internal Server Error' });        
    }
}

async function getGame(req, res) {
    try {
        const id = req.params.id;
        if (id && Number(id)) {
            const game = await gamesService.getGameById(Number(id));
            if (!game) {
                throw { status: 404, message: 'Jogo não encontrado' };
            }
            res.json(game);
        } else {
            res.status(422).json({ message: "ID inválido" });
        }
    } catch (error) {
        res.status(error.status ?? 500).json({ message: error.message ?? 'Internal Server Error' });        
    }
}

async function postGame(req, res) {
    try {
        const body = req.body;
        if (!body) {
            throw { status: 400, message: 'Body é obrigatório' }            
        }        
        Object.keys(body).forEach((key) => {
            if (!gameFields.includes(key)) {
                throw { status: 400, message: `Campo ${key} não é permitido` };
            }
            gameFields.forEach((field) => {
                if (!body[field]) {
                    throw { status: 400, message: `Campo ${field} é obrigatório` };
                }
            });
            if (key === 'matches') {
                const matches = body[key];
                for (const match of matches) {
                    Object.keys(match).forEach((matchKey) => {
                        if (!matchesFields.includes(matchKey)) {
                            throw { status: 400, message: `Campo ${matchKey} não é permitido em matches` };
                        }
                        matchesFields.forEach((field) => {
                            if (!match[field]) {
                                throw { status: 400, message: `Campo ${field} é obrigatório em matches` };
                            }
                        });
                        if (matchKey === 'team_1' || matchKey === 'team_2') {
                            Object.keys(match[matchKey]).forEach((teamKey) => {
                                if (!teamFields.includes(teamKey)) {
                                    throw { status: 400, message: `Campo ${teamKey} não é permitido em ${matchKey}` };
                                }
                                teamFields.forEach((field) => {
                                    if (!match[matchKey][field]) {
                                        throw { status: 400, message: `Campo ${field} é obrigatório em ${matchKey}` };
                                    }
                                });
                            });
                        }
                    });
                }
            }
            if (key === 'player_limit') {
                const playerLimit = body[key];
                Object.keys(playerLimit).forEach((playerLimitKey) => {
                    if (!playerLimitFields.includes(playerLimitKey)) {
                        throw { status: 400, message: `Campo ${playerLimitKey} não é permitido em player_limit` };
                    }
                });
                playerLimitFields.forEach((field) => {
                    if (!playerLimit[field]) {
                        throw { status: 400, message: `Campo ${field} é obrigatório em player_limit` };
                    }
                });
            }
        });
        await gamesService.createGame(body);
        res.status(201).json(body);
    } catch (error) {
        res.status(error.status ?? 500).json({ message: error.message ?? 'Internal Server Error' });
    }
}

async function patchGame(req, res) {
    try {
        const id = req.params.id;
        if (id && Number(id)) {
            const body = req.body;
            if (!body) {
                throw { status: 400, message: 'Body é obrigatório' }                
            }
            Object.keys(body).forEach((key) => {
            if (!gameFields.includes(key)) {
                throw { status: 400, message: `Campo ${key} não é permitido` };
            }
            if (key === 'matches') {
                const matches = body[key];
                for (const match of matches) {
                    Object.keys(match).forEach((matchKey) => {
                        if (!matchesFields.includes(matchKey)) {
                            throw { status: 400, message: `Campo ${matchKey} não é permitido em matches` };
                        }
                        if (matchKey === 'team_1' || matchKey === 'team_2') {
                            Object.keys(match[matchKey]).forEach((teamKey) => {
                                if (!teamFields.includes(teamKey)) {
                                    throw { status: 400, message: `Campo ${teamKey} não é permitido em ${matchKey}` };
                                }
                            });
                        }
                    });
                }
            }
            if (key === 'player_limit') {
                const playerLimit = body[key];
                Object.keys(playerLimit).forEach((playerLimitKey) => {
                    if (!playerLimitFields.includes(playerLimitKey)) {
                        throw { status: 400, message: `Campo ${playerLimitKey} não é permitido em player_limit` };
                    }
                });
            }
        });
        await gamesService.updateGame(body, Number(id));
        res.send("Jogo atualizado com sucesso");
        } else {
            res.status(422).json({ message: "ID inválido" });
        }
    } catch (error) {
        res.status(error.status ?? 500).json({ message: error.message ?? 'Internal Server Error' });
    }
}

async function deleteGame(req, res) {
    try {
        const id = req.params.id;
        if (id && Number(id)) {
            await gamesService.deleteGame(Number(id));
            res.json({ message: 'Jogo deletado com sucesso' });
        } else {
            res.status(422).json({ message: "ID inválido" });
        }
    } catch (error) {
        res.status(error.status ?? 500).json({ message: error.message ?? 'Internal Server Error' });
    }
}

module.exports = {
    getGames,
    getGame,
    postGame,
    patchGame,
    deleteGame
}