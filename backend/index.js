const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const dotenv = require("dotenv");
const cors = require("cors");

const mongoose = require("mongoose");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

const MONGO_URI = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.kkp0a.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

if (!MONGO_URI) {
  throw new Error("You must provide a MongoDB URI");
}

mongoose.connect(MONGO_URI);
mongoose.connection.once("open", () => console.log("Connected to MongoDB.")).on("error", (error) => console.log("Error connecting to MongoDB:", error));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(4000, () => {
  console.log("Listening on port 4000.");
});
