const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = express.Router();
const { carSchema, SplitYear, removeDuplicates } = require("./models/car");

router.use(cors());

const Car = mongoose.model("Car", carSchema);

router.get("/", async (req, res) => {
  const cars = await Car.find();
  if (!cars)
    return res.status(404).send("Sorry can't find any cars at this time.");
  res.send(cars);
});

router.get("/filter-makes", async (req, res) => {
  const cars = await Car.find().select("model");

  if (!cars) res.status(404).send("Car not found");
  const makes = cars.map((car) => car.model);

  removeDuplicates(makes);

  if (!makes)
    return res.status(404).send("Sorry the car makes have not been loaded");

  res.send(makes);
});

router.get("/:make/model", async (req, res) => {
  const { make } = req.params;
  const cars = await Car.find({ model: { $eq: make } });
  const models = []; //Create an empty array for the models

  for (let i = 0; i < cars.length; i++) {
    models.push(cars[i].brand); //add the model to the returning array
    removeDuplicates(models); //remove all duplicates model
  }

  if (!models)
    return res
      .status(404)
      .send("Sorry can't find models for the selected make");
  res.send(models);
});

router.get("/:make/:model/year", async (req, res) => {
  const { make: reqMake, model: reqModel } = req.params;
  const make = reqMake.trim();
  const model = reqModel.trim();

  const cars = await Car.find({ model: { $eq: make } }).find({
    brand: { $eq: model },
  });

  const years = []; //Create an empty array for the years

  for (let i = 0; i < cars.length; i++) {
    if (make === cars[i].model) {
      for (let j = 0; j < cars.length; j++) {
        if (model === cars[j].brand) {
          if (cars[i] === cars[j]) {
            years.push(SplitYear(cars[i]));
          }
        }
      }
    }
  }
  removeDuplicates(years);
  if (!years)
    return res
      .status(404)
      .send("Sorry can't find years for the selected model");
  res.send(years);
});

router.get("/:make/:model/:year", async (req, res) => {
  const { make: reqMake, model: reqModel, year: reqYear } = req.params;
  const make = reqMake.trim();
  const model = reqModel.trim();
  const year = reqYear.trim();

  const cars = await Car.find({ model: { $eq: make } }).find({
    brand: { $eq: model },
  });

  const filteredCar = cars.filter(
    (car) =>
      car.model === make && car.brand === model && year === SplitYear(car)
  );
  if (!filteredCar)
    return res.status(400).send("Sorry can't find this particular car");
  res.send(filteredCar);
});

module.exports = router;
