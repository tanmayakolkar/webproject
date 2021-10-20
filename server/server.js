const express = require("express");
const app = express();
const cors = require("cors");
const dotEnv = require("dotenv");
const mongoos = require("mongoose");

//congifure cors
app.use(cors());

//config express to recive data

app.use(express.json());

//config  dotenv

dotEnv.config({ path: "./.env" });

const hostname = process.env.HOST_NAME;
const port = process.env.PORT;
mongoos
  .connect(process.env.MONGO_DB_LOCAL_URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log("conntect to mongo db");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to express server</h1>`);
});

app.use("/api", require("./Router/productRouter"));

app.listen(port, hostname, () => {
  console.log(`the server url is http://${hostname}:${port}`);
});
