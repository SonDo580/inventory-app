const async = require("async");
const Category = require("./models/category");
const Item = require("./models/item");

const mongoose = require("mongoose");
const dev_db_url =
  "mongodb+srv://odin-inventory:odin-inventory@cluster0.uweld73.mongodb.net/odin-inventory?retryWrites=true&w=majority";
mongoose.connect(dev_db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
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
      return;
    }

    console.log(`New Item: ${item}`);
    items.push(item);
    callback(null, item);
  });
}

function createCategories(cb) {
  async.series(
    [
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
    ],
    // optional callback
    cb
  );
}

function createItems(cb) {
  async.series(
    [
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
      function (callback) {
        createItem(
          "I SPY MATCH",
          "Description",
          9.99,
          10,
          categories[0],
          callback
        );
      },
      function (callback) {
        createItem(
          "LEGO STAR WAR ADVENT",
          "Description",
          49.99,
          10,
          categories[1],
          callback
        );
      },
      function (callback) {
        createItem(
          "DARK TROOPER ATTACK",
          "Description",
          49.99,
          10,
          categories[1],
          callback
        );
      },
      function (callback) {
        createItem("OLIVIA", "Description", 18.99, 10, categories[2], callback);
      },
      function (callback) {
        createItem(
          "DAZZLE DUCKIE",
          "Description",
          7.99,
          10,
          categories[3],
          callback
        );
      },
      function (callback) {
        createItem(
          "COLOR BY NUMBER",
          "Description",
          3.99,
          10,
          categories[4],
          callback
        );
      },
      function (callback) {
        createItem(
          "MAGNETIC WOOD BLOCKS",
          "Description",
          39.99,
          10,
          categories[5],
          callback
        );
      },
      function (callback) {
        createItem(
          "LIFTING BRIDGE",
          "Description",
          32.99,
          10,
          categories[6],
          callback
        );
      },
      function (callback) {
        createItem(
          "ORBITING SOLAR SYSTEM",
          "Description",
          29.99,
          10,
          categories[7],
          callback
        );
      },
      function (callback) {
        createItem(
          "MINI PLAY GOLF GAME",
          "Description",
          39.99,
          10,
          categories[8],
          callback
        );
      },
    ],
    // optional callback
    cb
  );
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
