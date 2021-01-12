import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import Token from '../interface/TokenProp'
import APIURL from "../../helpers/environment";

type RecipeState = {
  recipeName: string;
  cuisine: string;
  prepTime: number | null | string;
  cookTime: number | string;
  directions: string;
};

export default class CreateRecipeIndex extends Component<Token, RecipeState> {
  constructor(props: Token) {
    super(props);
    this.state = {
      recipeName: "",
      cuisine: "",
      prepTime: null,
      cookTime: 0,
      directions: "",
    };
  }

  componentDidMount() {
    console.log("createRecipe didMount: ", this.props.token);
  }

  createRecipe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch(`${APIURL}/recipe/create`, {
      method: "POST",
      body: JSON.stringify({
        recipeName: this.state.recipeName,
        cuisine: this.state.cuisine,
        prepTime: this.state.prepTime,
        cookTime: this.state.cookTime,
        directions: this.state.directions,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${this.props.token}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.createRecipe(e)}>
          <TextField
            id="outlined-basic"
            label="Recipe Name"
            variant="outlined"
            onChange={(e) => this.setState({recipeName: e.target.value})}
          />
          <TextField
            id="outlined-basic"
            label="Cuisine"
            variant="outlined"
            onChange={(e) => this.setState({cuisine: e.target.value})}
          />
          <TextField
            id="outlined-basic"
            label="Prep Time(in mins)"
            variant="outlined"
            type='number'
            onChange={(e) => this.setState({prepTime: e.target.value})}
          />
          <TextField
            id="outlined-basic"
            label="Cook Time(in mins)"
            variant="outlined"
            type='number'
            onChange={(e) => this.setState({cookTime: e.target.value})}
          />
          <TextField
            id="outlined-basic"
            label="Directions"
            variant="outlined"
            onChange={(e) => this.setState({directions: e.target.value})}
          />
          <Button type="submit" variant="contained">
            Add Recipe
          </Button>
        </form>
      </div>
    );
  }
}
