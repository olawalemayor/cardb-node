const mongoose = require("mongoose");

const engineSchema = new mongoose.Schema({
  engineName: {
    Cylinders: String,
    Displacement: String,
    Power: String,
    Torque: String,
    "Fuel System": String,
    Fuel: String,
    "Fuel capacity": String,
    "Top Speed": String,
    "Acceleration 0-62 Mph (0-100 kph)": String,
    "Drive Type": String,
    Gearbox: String,
    Front: String,
    Rear: String,
    "Tire Size": String,
    Length: String,
    Width: String,
    Height: String,
    "Front/rear Track": String,
    Wheelbase: String,
    "Ground Clearance": String,
    "Cargo Volume": String,
    "Turning circle (curb to curb)": String,
    "Aerodynamics (Cd)": String,
    "Unladen Weight": String,
    "Gross Weight Limit": String,
    City: String,
    Highway: String,
    Combined: String,
    "CO2 Emissions": String,
  },
});

const Engine = mongoose.model("Engine", engineSchema);

const carSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  brand: String,
  model: String,
  url: String,
  engines: [engineSchema],
  description: String,
  images_links: [String],
  brochures: [String],
});

//Utilities
function removeDuplicates(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = arr.length; j > i; j--) {
      const jIndex = arr.indexOf(arr[j]);
      if (arr[i] == arr[j]) {
        arr.splice(jIndex, 1);
      }
    }
  }
}

function SplitYear(car) {
  return car.url.substring(car.url.length - 9, car.url.length - 5);
}
// End of utilities

exports.carSchema = carSchema;
exports.removeDuplicates = removeDuplicates;
exports.SplitYear = SplitYear;
