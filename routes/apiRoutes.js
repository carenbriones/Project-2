var db = require("../models");

module.exports = function(app) {
  // ---------- RECIPES ----------------//

  // Get ALL recipes with their Chef and category
  app.get("/api/recipes", function(req, res) {
    var query = {};
    if (req.query.chef_id) {
      query.ChefId = req.query.chef_id;
    }
    //??????????
    if (req.query.category_id) {
      query.CategoryId = req.query.category_id;
    }
    db.Recipe.findAll({
      where: query,
      include: [db.Chef, db.Category]
    }).then(function(dbRecipes) {
      res.json(dbRecipes);
    });
  });

  // Get a recipe by id
  app.get("/api/recipes/:id", function(req, res) {
    db.Recipe.findOne({
      include: [db.Chef, db.Category],
      where: { category: req.params.id }
    }).then(function(dbRecipes) {
      res.json(dbRecipes);
    });
  });

  //-----------CHEFS-----------------//

  // Get all chefs and their recipes
  app.get("/api/chefs", function(req, res) {
    db.Chef.findAll({
      include: db.Recipe
    }).then(function(dbChefs) {
      res.json(dbChefs);
    });
  });

  // Get a Chef by their id
  app.get("/api/chefs/:id", function(req, res) {
    db.Chef.findAll({
      include: db.Recipe,
      where: { id: req.params.id }
    }).then(function(dbChefs) {
      res.json(dbChefs);
    });
  });

  //------- CATEGORIES ------------//
  // Get all categories with their recipes
  app.get("/api/categories", function(req, res) {
    db.Category.findAll({
      include: db.Recipe
    }).then(function(dbCategorys) {
      res.json(dbCategorys);
    });
  });

  // Get one category by id with their recipes
  app.get("/api/categories/:id", function(req, res) {
    db.Category.findOne({
      include: db.Recipe,
      where: req.params.id
    }).then(function(dbCategorys) {
      res.json(dbCategorys);
    });
  });

  //----------CREATE--------------//
  // Create new recipe
  app.post("/api/recipes", function(req, res) {
    db.Recipe.create(req.body).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // Create new chef
  app.post("/api/chefs", function(req, res) {
    db.Chef.create(req.body).then(function(dbChef) {
      res.json(dbChef);
    });
  });

  //------------DELETE--------------//
  // Delete a recipe by id
  app.delete("/api/recipes/:id", function(req, res) {
    db.Recipe.destroy({ where: { id: req.params.id } }).then(function(
      dbRecipes
    ) {
      res.json(dbRecipes);
    });
  });

  // Delete a chef by id
  app.delete("/api/chefs/:id", function(req, res) {
    db.Chef.destroy({ where: { id: req.params.id } }).then(function(dbChefs) {
      res.json(dbChefs);
    });
  });
};

//-------------------------------------------//

//    /api/recipes-of-the-day
// app.get("/api/recipes-of-the-day", function(req, res) {
//   db.Example.findAll({}).then(function(dbExamples) {
//     res.json(dbExamples);
//   });
// });

// //  Get recipes with their category and Chef~~ (find one)
// app.get("/api/recipes/:category", function(req, res) {
//   db.Recipe.findAll({
//     include: [db.Chef, db.Category],
//     where: { category: req.params.category }
//   }).then(function(dbRecipes) {
//     res.json(dbRecipe);
//   });
// });
