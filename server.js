const port = 8000;

const cors = require("cors");
const express = require("express");
const dbConnection = require("./dbConnection");
const verifyToken = require("./middlewares/auth");

const usersRouter = require("./routes/users.routes");
const pollsRouter = require("./routes/polls.routes");
const votesRouter = require("./routes/votes.routes");

const main = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use("/", usersRouter);
  app.use("/polls", pollsRouter);
  app.use("/votes", votesRouter);

  dbConnection();

  app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
  });
};

main();
