const fs = require("fs");
const caminhoArquivo = "favoritos.json";

async function lerFavoritos() {
  const favoritos = await fs.promises.readFile(caminhoArquivo);
  return JSON.parse(favoritos);
}

async function getTodosFavoritos() {
  const favoritos = await lerFavoritos();
  return favoritos;
}

async function getFavoritoPorId(id) {
  const favoritos = await getTodosFavoritos();
  const favoritoFiltrado = favoritos.filter((favorito) => favorito.id == id)[0];
  return favoritoFiltrado;
}

async function insereFavorito(favorito) {
  const favoritos = await getTodosFavoritos();
  favoritos.push(favorito);
  await fs.promises.writeFile(caminhoArquivo, JSON.stringify(favoritos));
}

async function atualizaFavorito(favorito, id) {
  let favoritos = await getTodosFavoritos();
  const index = favoritos.findIndex((favorito) => favorito.id == id);
  favoritos[index] = favorito;
  await fs.promises.writeFile(caminhoArquivo, JSON.stringify(favoritos));
}

async function deletaFavorito(id) {
  let favoritos = await getTodosFavoritos();
  const favoritosFiltrados = favoritos.filter((favorito) => favorito.id != id);
  await fs.promises.writeFile(
    caminhoArquivo,
    JSON.stringify(favoritosFiltrados),
  );
}

module.exports = {
  getTodosFavoritos,
  getFavoritoPorId,
  insereFavorito,
  atualizaFavorito,
  deletaFavorito,
};
