const fs = require("fs");
const caminhoArquivo = "livros.json";

async function lerLivros() {
  const livros = await fs.promises.readFile(caminhoArquivo);
  return JSON.parse(livros);
}

async function getTodosLivros() {
  const livros = await lerLivros();
  return livros;
}

async function getLivroPorId(id) {
  const livros = await getTodosLivros();
  const livroFiltrado = livros.filter((livro) => livro.id == id)[0];
  return livroFiltrado;
}

async function insereLivro(livroNovo) {
  const livros = await getTodosLivros();
  livros.push(livroNovo);
  await fs.promises.writeFile(caminhoArquivo, JSON.stringify(livros));
}

async function atualizaLivro(livro, id) {
  let livros = await getTodosLivros();
  const index = livros.findIndex((livro) => livro.id == id);
  livros[index] = livro;
  await fs.promises.writeFile(caminhoArquivo, JSON.stringify(livros));
}

async function deletaLivro(id) {
  let livros = await getTodosLivros();
  const livrosFiltrados = livros.filter((livro) => livro.id != id);
  await fs.promises.writeFile(caminhoArquivo, JSON.stringify(livrosFiltrados));
}

module.exports = {
  getTodosLivros,
  getLivroPorId,
  insereLivro,
  atualizaLivro,
  deletaLivro,
};
