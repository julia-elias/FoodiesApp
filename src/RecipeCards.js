
import React, { useState } from 'react';
import "./recipes.css";
import ViewRecipePopup from './modals/ViewRecipe'
import LowEnergyIcon from './svg/low_energy.svg'
import MediumEnergyIcon from './svg/medium_energy.svg'
import HighEnergyIcon from './svg/high_energy.svg'
import TagIcon from "./svg/tag.svg"

export default function RecipeCards(props) {

  const energyIcons = [LowEnergyIcon, MediumEnergyIcon, HighEnergyIcon];
  const energyLevels = ["Low", "Medium", "High"];
  
  // TODO: add a "no recipes to show" message if needed
  
  // variables and functions for View Recipe popup
  const [showPopup, setShowPopup] = useState(false);
  const [keyOfRecipeToView, setKeyOfRecipeToView] = useState(0);
  

  // dummy state variable that needs to be passed as parameter but isn't used
  const [currentMealDetails, setCurrentMealDetails] = useState([])

  // Sets the needed information in order to open the view recipe modal of the selected recipe
  const handleOpenViewPopup = (key) => {
      console.log("key of recipe " + key)
      setKeyOfRecipeToView(key);
      setShowPopup(true);
  }

  const handleCloseViewPopup = () => setShowPopup(false);

  // When user clicks a recipe, this handler determines the action that should be taken next.
  const handleClick = (key) => {
    
    // If view is true, this means that the view modal of the recipe should be displayed
    if (props.view === true) {
      handleOpenViewPopup(key)

    // Otherwise, if view is false, this means that the recipe is just selected to be added to the meal plan.
    // And therefore its index is being saved.
    } else  {
      // If the user had already selected the recipe but clicked it again, the recipe will be deselected.
      if (props.addedRecipe === key ) {
        props.setAddedRecipe(-1)
      
      // Otherwise, added recipe will be set to store the key of the selected recipe
      } else {
        props.setAddedRecipe(key)

        // Sets custom to false to no longer select the custom meal option
        props.setCustom(false)
      }     
    }
  }
  {/* If the recipes are being shown on the meal plan page, the selected recipe will appear green. */}

  return (
      <div>
      {props.recipes.
        filter((recipe) => (recipe.title?.toLowerCase().match(props.searchInput.toLowerCase().trim()) || recipe.ingredients?.join(", ").toLowerCase().match(props.searchInput.toLowerCase().trim()))).
        sort(props.sortFunction).
        filter((recipe) => props.shouldBeShown(recipe)).
        map((recipe, index) => (
        <div className={props.addedRecipe === recipe.key ? "row pe-auto chosenRecipe" : "row pe-auto recipe-card"} onClick={()=>handleClick(recipe.key)} key={index}>
            <div className='col-6' id='image'>
            <img src={recipe.picture} id="recipe-image" alt=""/>            
            </div>
            <div className='col-6' id='recipe-info'>
                <h4 className='recipe-title'>{recipe.title}</h4>
                <div className='row' id="energy-and-time">
                    <div className='col-5' id="card-energy-icon">
                      <img className="energy-icon" src={energyIcons[energyLevels.indexOf(recipe.energyRequired)]}></img>
                    </div>
                    <div className='col-7' id="card-time">
                      {recipe.hoursRequired !== "0" ? recipe.hoursRequired + " hours " : ""}{recipe.minsRequired !== "0" ? recipe.minsRequired + " mins" : ""}
                    </div>
                </div>
                <div className="recipe-tags">
                  {recipe.tags?.map((tag) => (<><div className='recipe-tag'><img className='tag-icon' src={TagIcon}></img><p>{tag}</p></div></>))}
                </div>
            </div>
        </div>
      ))}
      {props.view && <ViewRecipePopup app={props.app} recipes={props.recipes} 
      currentMealDetails={currentMealDetails} setCurrentMealDetails={setCurrentMealDetails}
      showViewPopup={showPopup} handleCloseViewPopup={handleCloseViewPopup} keyOfRecipeToView={keyOfRecipeToView}
       setRecipes={props.setRecipes} groceryList={props.groceryList} addToGL={props.addToGL}> </ViewRecipePopup>}

      </div>
  )
}