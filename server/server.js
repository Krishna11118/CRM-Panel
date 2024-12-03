const express = require("express");
const mongoose = require("mongoose");
const config = require("./src/config/config");
const routes = require("./src/routes/v1/index");
const requestIp = require("request-ip");


const cors = require("cors");

const app = express();
const port = config.port || 3001;

app.use(cors());

app.use(requestIp.mw());
app.use(express.json());


app.use("/v1", routes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    console.log("Server is connected to MongoDB");
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB", error);
  });
