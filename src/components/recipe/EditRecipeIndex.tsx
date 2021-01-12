import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";

type EditRecipeState = {
  recipeName: string;
  cuisine: string;
  prepTime: number | null;
  cookTime: number | null;
  directions: string;
};

interface Props {
  token: string | null;
  activeRecipe: UserRecipe;
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

class EditRecipeIndex extends Component<Props, EditRecipeState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      recipeName: this.props.activeRecipe.recipeName,
      cuisine: this.props.activeRecipe.cuisine,
      prepTime: this.props.activeRecipe.prepTime,
      cookTime: this.props.activeRecipe.cookTime,
      directions: this.props.activeRecipe.directions,
    };
  }

  editRecipe(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault();
      fetch(`http://localhost:3210/recipe/${this.props.activeRecipe.id}`, {
          method: 'PUT',
          body: JSON.stringify({
              recipeName: this.state.recipeName,
              cuisine: this.state.cuisine,
              prepTime: this.state.prepTime,
              cookTime: this.state.cookTime,
              directions: this.state.directions
          }),
          headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': `${this.props.token}`
          })
      }).then((res)=>res.json())
        .then((updatedRecipe)=>{
            console.log(updatedRecipe)
        })
  }


  setPrepTime(e: any) {
    this.setState({
      prepTime: e,
    });
  }

  setCookTime(e: any) {
    ;
  }

  componentDidMount() {
    console.log("activeRecipe: ", this.props.activeRecipe);
    // console.log("recipe to edit: ", this.state.directions);
  }

  render() {
    return (
      <div>
        <form onSubmit={(e)=>this.editRecipe(e)}>
          <TextField
            id="outlined-basic"
            label="Recipe Name"
            variant="outlined"
            value={this.state.recipeName}
            onChange={(e) => this.setState({recipeName: e.target.value})}
          />
          <TextField
            id="outlined-basic"
            label="Cuisine"
            variant="outlined"
            value={this.state.cuisine}
            onChange={(e) => this.setState({cuisine: e.target.value})}
          />
          <TextField
            id="outlined-basic"
            label="Prep Time"
            variant="outlined"
            value={this.state.prepTime}
            type='number'
            onChange={(e) => this.setPrepTime(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Cook Time"
            variant="outlined"
            value={this.state.cookTime}
            type='number'
            onChange={(e) => this.setCookTime(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Directions"
            variant="outlined"
            value={this.state.directions}
            onChange={(e) => this.setState({directions: e.target.value})}
          />
          <Button type="submit" variant="contained">
            Submit Changes
          </Button>
        </form>
      </div>
    );
  }
}

export default EditRecipeIndex;
