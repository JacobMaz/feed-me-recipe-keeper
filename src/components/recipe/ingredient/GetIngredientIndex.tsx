import React, { Component } from "react";
import { Checkbox } from "@material-ui/core";

type GetIngredientState = {
  recipeId: number;
  ingredients: any;
  checked: boolean;
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
          <ul>
            <li>
              <Checkbox
                checked={this.state.checked}
                onChange={() => this.setState({ checked: !this.state.checked })}
                name="Check Me!"
              />
              Ingredient
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default GetIngredientIndex;
