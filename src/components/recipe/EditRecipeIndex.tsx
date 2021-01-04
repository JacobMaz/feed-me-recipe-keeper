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
  recipeToEdit: any;
}

class EditRecipeIndex extends Component<Props, EditRecipeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      recipeName: this.props.recipeToEdit.recipeName,
      cuisine: this.props.recipeToEdit.cuisine,
      prepTime: this.props.recipeToEdit.prepTime,
      cookTime: this.props.recipeToEdit.cookTime,
      directions: this.props.recipeToEdit.directions,
    };
  }

  editRecipe(e: any){
      e.preventDefault();
      fetch(`http://localhost:3210/recipe/${this.props.recipeToEdit.id}`, {
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

  setRecipeName(e: any) {
    this.setState({
      recipeName: e,
    });
  }

  setCuisine(e: any) {
    this.setState({
      cuisine: e,
    });
  }

  setPrepTime(e: any) {
    this.setState({
      prepTime: e,
    });
  }

  setCookTime(e: any) {
    this.setState({
      cookTime: e,
    });
  }

  setDirections(e: any) {
    this.setState({
      directions: e,
    });
  }

  componentDidMount() {
    console.log("EditRecipeIndex", this.props.recipeToEdit);
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
            onChange={(e) => this.setRecipeName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Cuisine"
            variant="outlined"
            value={this.state.cuisine}
            onChange={(e) => this.setCuisine(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Prep Time"
            variant="outlined"
            value={this.state.prepTime}
            onChange={(e) => this.setPrepTime(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Cook Time"
            variant="outlined"
            value={this.state.cookTime}
            onChange={(e) => this.setCookTime(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Directions"
            variant="outlined"
            value={this.state.directions}
            onChange={(e) => this.setDirections(e.target.value)}
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
