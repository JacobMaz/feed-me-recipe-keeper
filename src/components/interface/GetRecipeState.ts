interface GetRecipeState {
    allRecipe: AllRecipe[];
    message: string;
    expanded: boolean;
  }
  
  interface AllRecipe {
    id: number;
    recipeName: string;
    cuisine: string;
    prepTime: number;
    cookTime: number;
    directions: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
    user: User;
    ingredients: Ingredient[];
  }
  
  interface Ingredient {
    id: number;
    name: string;
    quantity: string;
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

  export default GetRecipeState