const express = require("express");
const app = express();
const port = 8000;
const teamRoutes = require("./routes/team");
const playerRoutes = require("./routes/player");

app.use(express.json());
app.use("/teams", teamRoutes);
app.use("/players", playerRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
