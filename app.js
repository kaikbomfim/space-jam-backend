const express = require("express");
const app = express();
const port = 8000;
//const rotaLivro = require("./rotas/livros");
//const rotaFavorito = require("./rotas/favoritos");

app.use(express.json());
//app.use("/livros", rotaLivro);
//app.use("/favoritos", rotaFavorito);

app.listen(port, () => {
  console.log(`Escutando a porta ${port}`);
});
