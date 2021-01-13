import React, { Component } from "react";
import { createStyles, withStyles, WithStyles, Theme } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
} from "@material-ui/core";
import APIURL from "../../../helpers/environment";

const styles = (theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  });

interface IngredientState {
  name: string;
  quantity: number;
  measurement: string;
  ingredientType: string;
  recipeId: number
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

interface Props extends WithStyles<typeof styles> {
  token: string | null;
  activeRecipe: UserRecipe
}

class CreateIngredientIndex extends Component<Props, IngredientState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
      quantity: 0,
      measurement: '',
      ingredientType: '',
      recipeId: this.props.activeRecipe.id
    };
  }

  setQuantity(e: any) {
    this.setState({
      quantity: (e),
    });
  }

  setMeasurement(e: any) {
    this.setState({
      measurement: (e),
    });
  }

  setIngredientType(e: any) {
    this.setState({
      ingredientType: (e),
    });
  }

  componentDidMount(){
      console.log('Recipe ID!! ', this.state.recipeId)
  }
  
  createIngredient(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch(`${APIURL}/ingredient/create`, {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        quantity: this.state.quantity,
        measurement: this.state.measurement,
        ingredientType: this.state.ingredientType,
        recipeId: this.state.recipeId
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${this.props.token}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("createIngredient", data);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <form onSubmit={(e)=>this.createIngredient(e)}>
          <TextField
            id="outlined-basic"
            label="Ingredient Name"
            variant="outlined"
            onChange={(e) => this.setState({name: e.target.value})}
          />
          <TextField
            id="outlined-basic"
            label="Quantity"
            variant="outlined"
            onChange={(e) => this.setQuantity(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="measurement"
            variant="outlined"
            onChange={(e) => this.setMeasurement(e.target.value)}
          />
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={this.state.ingredientType}
              onChange={(e) => this.setIngredientType(e.target.value)}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value='Main'>Main</MenuItem>
              <MenuItem value='Produce'>Produce</MenuItem>
              <MenuItem value='Sauces'>Sauces</MenuItem>
              <MenuItem value='Sugar and Spices'>Sugar and Spices</MenuItem>
              <MenuItem value='Baking'>Baking</MenuItem>
            </Select>
          </FormControl>
          <Button type='submit' variant='contained' >Add Ingredient</Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(CreateIngredientIndex);
