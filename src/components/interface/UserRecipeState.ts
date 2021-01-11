  interface UserRecipesState {
    userRecipes: UserRecipe[];
    expanded: boolean;
    open: boolean;
    editOpen: boolean;
    recipeToEdit: UserRecipe[];
    ingredientIsOpen: boolean;
    recipe: UserRecipe[];
    visible: boolean
    drawer: boolean
    editIngredient: any
    message: string;
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

  export default UserRecipesState