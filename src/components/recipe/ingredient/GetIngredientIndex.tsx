import React, { Component } from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";

type GetIngredientState = {
  recipeId: number;
  ingredients: any;
  checked: boolean;
  ingredientToEdit: any
};

interface Props {
  token: string | null;
  recipe: any;
}

class GetIngredientIndex extends Component<Props, GetIngredientState> {
  constructor(props: any) {
    super(props);
    this.state = {
      recipeId: this.props.recipe.id,
      ingredients: [],
      checked: false,
      ingredientToEdit: []
    };
  }

  ingredients() {
    fetch(`http://localhost:3210/ingredient/${this.state.recipeId}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${this.props.token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          ingredients: data.ingredients,
        });
        console.log("ingredients Fetch: ", data.ingredients);
      });
  }

  handleCheck() {}

  componentDidMount() {
    // console.log("GetIngredientInedx: ", this.state.recipeId);
    this.ingredients();
    // console.log('Ingredients state: ', this.state.ingredients)
  }

  render() {
    return (
      <div>
        <div>
              {this.state.ingredients === [] ? <div><h3>No Ingredients</h3></div> : this.state.ingredients.map((ingredient: any, index: number) => (
                  <div>
                    <FormControlLabel key={index}
                      value="end"
                      control={<Checkbox color="primary" checked={this.state.checked}
                      onChange={() => this.setState({ checked: !this.state.checked })} />}
                      label={ingredient.name}
                      labelPlacement="end"
                    />
                  </div>
              ))}
        </div>
      </div>
    );
  }
}

export default GetIngredientIndex;
