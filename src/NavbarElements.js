import React, { useState, Component, useEffect } from 'react'
import { Navbar, Nav } from 'react'
import './nav_bar.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    BrowserRouter
} from "react-router-dom";


import GroceryListHome from './grocery_list.js';
import InventoryHome from './inventory.js';
import MealPlanHome from './meal_plan';
import RecipesHome from './recipes';
import AccountHome from './account';
import { getDatabase,  ref, set, child, get, update, getReference, push, onValue  } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";


function NavbarElements(props) {
    const db = getDatabase(props.app)
    console.log(db)
    const auth = getAuth(props.app)

    let doAgain = true;
    
    // method called when user first signs up for our app in order to populate database with their collection
    function writeUserData() {
      
      // contains default structure to store data
      let dataStructure = require('./newUser.json');
      console.log("database")
      console.log(dataStructure)
      // set(ref(db, 'users/' + auth.currentUser.uid), dataStructure)) 
     
       // Uses the current user's UID (the user who is logged in) to retrieve their associated data in firebase. 
       get(child(ref(db), `users/`+auth.currentUser.uid)).then((snapshot) => {
        
        // If a collection exists for the specified user UID:
        if (snapshot.exists()) {
          console.log(snapshot.val());
          // addFavorites(snapshot.val().favorites);
        
        // If a collection does not exist for the user, create one. 
        }   
        })
    }

    const [categories, setCategory] = useState([]);
    const handleCategory = (name, data) => {
        setCategory( categories => [
            ...categories, 
        {value: name, data: data}
        ]);
    };


    // Populates pages with data for the current user
    useEffect(()=> {
      const dbRef = ref(db);

      // Uses the current user's UID to retrieve their associated data in firebase. 
      get(child(dbRef, `users/`+auth.currentUser.uid)).then((snapshot) => {
        
        // If a collection exists for the specified user UID:
        if (snapshot.exists()) {
          console.log(snapshot.val());
          // addFavorites(snapshot.val().favorites);
        
        // If a collection does not exist for the user, create one. 
        } else {

          // Creates empty data structure for new user.
          // writeUserData()
          console.log("user does not yet have information")
        }
      })

      if(doAgain){
      const dbRefC = ref(db, '/users/' + auth.currentUser.uid + '/grocery_list/categories/');
      onValue(dbRefC, (snapshot) => {
          snapshot.forEach((childSnapshot) => {
              const childKey = childSnapshot.key;
              const childData = childSnapshot.val();
              handleCategory(childKey, childData);
          });
      })
      doAgain = false;
    }
    }, [])

    


    // Dummy items for now lol   
    const [itemsInPersonalInv, addPersonalItemInv] = useState([
        {value:"carrots", label:"carrots"},
        {value:"fruit snacks", label: "fruit snacks"}
        ]);
    
    const [itemsInSharedInv, addSharedItemInv] = useState([
        {value:"oat milk", label:"oat milk"},
        {value:"rice", label: "rice"}
        ]);

            // Dummy items for now lol
    const [itemsInPersonalGL, addPersonalItemGL] = useState([
        {value:"hummus", label:"hummus"},
        {value:"strawberries", label: "Stawberries"},
        {value:"raspberries", label: "raspberries"},
        {value:"milk", label: "milk"}
        ]);

    const PersonalGLCopy = [...itemsInPersonalGL];
    
    const [itemsInSharedGL, addSharedItemGL] = useState([
        {value:"almond milk", label:"almond milk"},
        {value:"flour", label: "flour"}
        ]);
    
    // mock database of recipes - TODO: make the pictures actual pictures!
    let [recipes, setRecipes] = useState([{title: "Lemon Dill Chicken Soup", picture: "R1 Picture", energyRequired: "Medium Energy", timeRequired: "35 min", tags: ["lunch", "soup season"], ingredients: ["5 cups bone broth (or low-sodium chicken broth)", "2 cups cooked rice", "2 egg yolks", "1/3 cup lemon juice", "2 cups chopped cooked chicken", "2 Tablespoons chopped fresh dill", "Salt and pepper (to taste)"], steps: ["In a large saucepan, bring the broth to a simmer and season with salt and pepper, to taste.", "Add ½ cup rice, egg yolks and lemon juice to a blender, slowly stream in 1 cup of hot broth and puree until smooth.", "Stir the puree into the simmering stock along with the chopped chicken and remaining rice", "Simmer until slightly thickened, approximately 10 minutes.", "Stir in the fresh dill and serve"], notes: ""},
                    {title: "Alfredo Pasta", picture: "R2 Picture", energyRequired: "Low Energy", timeRequired: "15 min", tags: ["lunch", "dinner"], ingredients: ["8 ounce pasta", "4 tablespoon butter", "2 cloves garlic minced", "1 1/2 cups milk", "1 cup heavy cream", "1/2 cup Parmesan cheese shredded", "1/4 teaspoon salt or to taste", "1/4 teaspoon pepper or to taste", "2 tabelspoon fresh parsley chopped"], steps: ["Cook the pasta according to the package instructions.", "Melt the butter in a large skillet over medium high heat.", "Add the garlic and cook for 30 seconds, or until fragrant.", "Pour in the milk and cream. Stir consistently to avoid burning on the bottom of the pan until the mixture comes to a boil", "Turn the heat down to medium, and mix in the parmesan cheese, salt, and pepper.", "Adjust the seasoning to your own taste", "Remove the pan from the heat and mix in the cooked pasta until the sauce begins to thicken.", "Garnish with parsley, and serve."], notes: "You can use a larger ratio of milk to cream if you'd like to cut down on calories. This can be served with chicken or mushrooms to add some protein."},
                    {title: "Pancakes", picture: "R3 Picture", energyRequired: "Medium Energy", timeRequired: "20 min", tags: ["breakfast", "comfort food"], ingredients: ["1 1/2 cups all-purpose flour", "3 1/2 teaspoons baking powder", "1 tablespoon white sugar", "1/4 teaspoon salt, or more to taste", "1 1/4 cups milk", "3 tablespoons butter, melted", "1 egg", "1/4 teaspoon pepper or to taste"], steps: ["Sift flour, baking powder, sugar, and salt together in a large bowl.", "Make a well in the center and add milk, melted butter, and egg; mix until smooth.", "Heat a lightly oiled griddle or pan over medium-high heat", "Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake", ">Cook until bubbles form and the edges are dry, about 2 to 3 minutes", "Flip and cook until browned on the other side", "Repeat with remaining batter"], notes: ""}]);

    return (
        <BrowserRouter>
        <Routes>
            <Route path="/grocery_list.js" element={
                <GroceryListHome itemsInPersonalGL={itemsInPersonalGL}
                itemsInSharedGL={itemsInSharedGL}
                addPersonalItemGL={addPersonalItemGL}
                 addSharedItemGL={addSharedItemGL}
                 itemsInPersonalInv={itemsInPersonalInv}
                itemsInSharedInv={itemsInSharedInv}
                 addPersonalItemInv={addPersonalItemInv}
                  addSharedItemInv={addSharedItemInv}
                  props={props}
                  welp={categories}> </GroceryListHome>
            } />
            <Route path="/inventory.js" element={
                <InventoryHome itemsInPersonalInv={itemsInPersonalInv}
                itemsInSharedInv={itemsInSharedInv}
                 addPersonalItemInv={addPersonalItemInv}
                  addSharedItemInv={addSharedItemInv}
                  itemsInPersonalGL={itemsInPersonalGL}
                itemsInSharedGL={itemsInSharedGL}
                addPersonalItemGL={addPersonalItemGL}
                 addSharedItemGL={addSharedItemGL}>  </InventoryHome>
            } />
            <Route path="/meal_plan.js" element={
                <MealPlanHome recipes={recipes} setRecipes={setRecipes} personalGroceryList={itemsInPersonalGL} addToGL={addPersonalItemGL}/> 
            } />
            <Route path="/recipes.js" element={
                <RecipesHome recipes={recipes} setRecipes={setRecipes} personalGroceryList={itemsInPersonalGL} addToGL={addPersonalItemGL} /> 
            } />
            <Route path="/account.js" element={
                <AccountHome /> 
            } />
        </Routes>

        <nav className="navbar fixed-bottom navbar-light">
              <span className="navbar-text">
                  <img src="grocery_list.png"></img>
                  <Link to="/grocery_list.js" className='nav-link'>List</Link>
              </span>
              <span className="navbar-text">
                  <Link to="/inventory.js" className='nav-link'>Inventory</Link>
                  {}
              </span>
              <span className="navbar-text">
                  <Link to="/meal_plan.js" className='nav-link'>Meal Plan</Link>
                  {}
              </span>
              <span className="navbar-text">
                  <Link to="/recipes.js" className='nav-link'>Recipes</Link>
                  {}
              </span>
              <span className="navbar-text">
                  <Link to="/account.js" className='nav-link'>Account</Link>
                  {}
              </span>
          </nav>
          <div>
          </div>
        </BrowserRouter>  
    );
}

export default NavbarElements

//     //<div>
//     <nav class="navbar fixed-bottom navbar-light">
//     <span class="navbar-text">
//         <img src="grocery_list.png"></img>
//         <Link to="/grocery_list" className='nav-link'>List</Link>
//     </span>
//     <span class="navbar-text">
//         <Link to="/inventory" className='nav-link'>Inventory</Link>
//         {/*<a class="nav-link" href="inventory.js">Inventory</a>*/}
//     </span>
//     <span class="navbar-text">
//         <Link to="/meal_plan" className='nav-link'>Meal Plan</Link>
//         {/*<a class="nav-link" href="meal_plan.js">Meal Plan</a>*/}
//     </span>
//     <span class="navbar-text">
//         <Link to="/recipes" className='nav-link'>Recipes</Link>
//         {/*<a class="nav-link" href="recipes.js">Recipes</a>*/}
//     </span>
//     <span class="navbar-text">
//         <Link to="/account" className='nav-link'>Account</Link>
//         {/*<a class="nav-link" href="account.js">Account</a>*/}
//     </span>
// </nav>
// <div>
// </div>
// </div>
