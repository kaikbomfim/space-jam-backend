const express = require("express");
const app = express();
const port = 8000;
const participationRoutes = require("./routes/participation");

app.use(express.json());
app.use("/participations", participationRoutes);

app.listen(port, () => {
  console.log(`Escutando a porta ${port}`);
});
