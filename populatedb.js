const async = require("async");
const Category = require("./models/category");
const Item = require("./models/item");

const mongoose = require("mongoose");
const mongoDB =
  "mongodb+srv://odin-inventory:odin-inventory@cluster0.uweld73.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const categories = [];
const items = [];

function createCategory(name, description, callback) {
  const category = new Category({ name, description });

  category.save((error) => {
    if (error) {
      callback(error, null);
      return;
    }

    console.log(`New Category: ${category}`);
    categories.push(category);
    callback(null, category);
  });
}

function createItem(name, description, price, number, category, callback) {
  const item = new Item({
    name,
    description,
    price,
    number,
    category,
  });

  item.save((error) => {
    if (error) {
      callback(error, null);
    }

    console.log(`New Item: ${item}`);
    items.push(item);
    cb(null, item);
  });
}

function createCategories() {
  async.series([
    function (callback) {
      createCategory("GAMES & PUZZLES", "Description", callback);
    },
    function (callback) {
      createCategory("LEGO", "Description", callback);
    },
    function (callback) {
      createCategory("BOOKS", "Description", callback);
    },
    function (callback) {
      createCategory("BABY", "Description", callback);
    },
    function (callback) {
      createCategory("CREATIVITY", "Description", callback);
    },
    function (callback) {
      createCategory("CONSTRUCTION", "Description", callback);
    },
    function (callback) {
      createCategory("IMAGINATION", "Description", callback);
    },
    function (callback) {
      createCategory("EXPLORATION", "Description", callback);
    },
    function (callback) {
      createCategory("ACTIVE PLAY & SPORT", "Description", callback);
    },
  ]);
}

function createItems() {
  async.parallel([
    function (callback) {
      createItem(
        "GAME OF WOLF",
        "Description",
        24.99,
        10,
        categories[0],
        callback
      );
    },
  ]);
}

async.series([createCategories, createItems], (error, results) => {
  if (error) {
    console.log(`Error: ${error}`);
  } else {
    console.log("Added items sucessfully");
  }
  // Disconnect from database
  mongoose.connection.close();
});
