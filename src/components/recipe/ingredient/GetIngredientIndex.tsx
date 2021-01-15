import React, { Component } from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import APIURL from "../../../helpers/environment";

interface GetIngredientState {
  recipeId: number;
  ingredients: Ingredient[];
  checked: boolean;
};

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

interface Props {
  token: string | null;
  activeRecipe: UserRecipe;
}

class GetIngredientIndex extends Component<Props, GetIngredientState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      recipeId: this.props.activeRecipe.id,
      ingredients: [],
      checked: false,
    };
  }

  ingredients() {
    fetch(`${APIURL}/ingredient/${this.state.recipeId}`, {
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

  componentDidMount() {
    // console.log("GetIngredientInedx: ", this.state.recipeId);
    this.ingredients();
    // console.log('Ingredients state: ', this.state.ingredients)
  }

  render() {
    return (
      <div>
        <div>
              {this.state.ingredients === [] ? <div><h3>No Ingredients</h3></div> : this.state.ingredients.map((ingredient: Ingredient) => (
                  <div>
                    <FormControlLabel key={ingredient.id}
                      value="end"
                      control={<Checkbox color="primary"
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
