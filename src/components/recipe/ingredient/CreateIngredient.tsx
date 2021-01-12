import React from 'react'
import CreateIngredientIndex from './CreateIngredientIndex';

interface Props {
    token: string | null
    activeRecipe: UserRecipe
}

interface UserRecipe {
    id: number;
    recipeName: string;
    cuisine: string;
    prepTime: number | null;
    cookTime: number;
    directions: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
    user: User[];
    ingredients: Ingredient[];
  }
  
  interface Ingredient {
    id: number;
    name: string;
    quantity: number;
    measurement: string;
    ingredientType: string;
    createdAt: string;
    updatedAt: string;
    recipeId: number;
    userId: number;
  }
  
  interface User {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  }

const CreateIngredient = (props: Props) => {

    return (
            <div>
                <CreateIngredientIndex activeRecipe={props.activeRecipe} token={props.token} />
            </div>
    )
}

export default CreateIngredient;