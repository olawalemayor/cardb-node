const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cars = require("./routes/cars");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", cars);

const URI = process.env.app_db || "localhost:27017";

if (process.env.app_db)
  mongoose
    .connect(`mongodb+srv://${URI}/car-database`)
    .then(() => console.log("connected to mongoDB"))
    .catch((err) =>
      console.error("Could not connect to MongDB...", err.message)
    );
else
  mongoose
    .connect(`mongodb://${URI}/car-database`)
    .then(() => console.log("connected to mongoDB"))
    .catch((err) =>
      console.error("Could not connect to MongDB...", err.message)
    );

const port = process.env.PORT || 9000;

app.listen(port, () => console.log(`server is now running at ${port}!!!`));
