const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb+srv://KharismaNankani:12345@ironhack.3fh335v.mongodb.net/recipes';
 

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  Recipe.create({
  title: "Chocolate Cake",
  level: "Easy Peasy",
  ingredients: ["eggs", "sugar", "flour", "cocoa powder", "baking powder", "milk"],
  cuisine: "International", 
  dishType: "dessert",
  duration: 60,
  creator: "Chef John"
})
.then(recipe => {
  console.log(`Recipe created: ${recipe.title}`);
})
.catch(error => {
  console.log(`Error creating recipe: ${error}`);
});
})
  
  
Recipe.insertMany(data)
  .then(recipes => {
    console.log(`Added ${recipes.length} recipes to the database:`);
    recipes.forEach(recipe => {
      console.log(recipe.title);
    });
  })
  .catch(error => {
    console.log(`Error adding recipes to the database: ${error}`);
  });

  Recipe.findOneAndUpdate(
  { title: "Rigatoni alla Genovese" }, // filter to find the recipe
  { duration: 100 }, // update the duration to 100
  { new: true } // return the updated document instead of the original
)
.then(updatedRecipe => {
  console.log(`Updated recipe: ${updatedRecipe.title}`);
})
.catch(error => {
  console.log(`Error updating recipe: ${error}`);
});

Recipe.deleteOne({ title: "Carrot Cake" })
  .then(() => {
    console.log("Carrot Cake successfully removed from the database");
  })
  
mongoose.connection.close()
.catch(error => {
    console.error('Error connecting to the database', error);
  });
  
  