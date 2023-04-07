
import React, { useState } from 'react';
import "./recipes.css";
import ViewRecipePopup from './modals/ViewRecipe'

export default function RecipeCards(props) {
  
  // TODO: add a "no recipes to show" message if needed
  
  // variables and functions for View Recipe popup
  const [showPopup, setShowPopup] = useState(false);
  const [indexOfRecipeToView, setIndexOfRecipeToView] = useState(0);
  
  // Sets the needed information in order to open the view recipe modal of the selected recipe
  const handleOpenViewPopup = (index) => {
      setIndexOfRecipeToView(index);
      setShowPopup(true);
  }

  const handleCloseViewPopup = () => setShowPopup(false);

  // When user clicks a recipe, this handler determines the action that should be taken next.
  const handleClick = (index) => {
    
    // If view is true, this means that the view modal of the recipe should be displayed
    if (props.view === true) {
      handleOpenViewPopup(index)

    // Otherwise, if view is false, this means that the recipe is just selected to be added to the meal plan.
    // And therefore its index is being saved.
    } else  {
      props.setAddedRecipe(index)
      props.setShowPopup(false)
    }
  }

  return (
      <div>
      {props.recipes.map((recipe, index) => (
        
        <div className='row pe-auto' id='recipe-card' onClick={()=>handleClick(index)} key={index}>
            <div className='col-6' id='image'>{recipe.picture}</div>
            <div className='col-6' id='recipe-info'>
                <h4>{recipe.title}</h4>
                <div className='row'>
                    <div className='col-6'>{recipe.energyRequired}</div>
                    <div className='col-6'>{recipe.timeRequired}</div>
                </div>
                <p className='tags'>{recipe.tags?.join(", ")}</p>
            </div>
        </div>
      ))}
      {props.view && <ViewRecipePopup recipes={props.recipes} showViewPopup={showPopup} handleCloseViewPopup={handleCloseViewPopup} indexOfRecipeToView={indexOfRecipeToView} setRecipes={props.setRecipes} groceryList={props.groceryList} addToGL={props.addToGL}> </ViewRecipePopup>}

      </div>
  )
}