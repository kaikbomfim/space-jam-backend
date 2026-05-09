const express = require("express");
const participationsRouter = require("./routes/participations");

const app = express();
const port = 8000;

app.use(express.json());
app.use("/participations", participationsRouter);

app.listen(port, () => {
  console.log(`Escutando a porta ${port}`);
});
