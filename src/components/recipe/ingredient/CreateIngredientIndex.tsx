import React, { Component } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
} from "@material-ui/core";

const styles = (theme: any) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  });

type IngredientState = {
  name: string;
  quantity: number;
  measurement: string;
  ingredientType: string;
  recipeId: number
};

interface Props {
  token: string | null;
  classes: any;
  recipe: any
}

class CreateIngredientIndex extends Component<Props, IngredientState> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: '',
      quantity: 0,
      measurement: '',
      ingredientType: '',
      recipeId: this.props.recipe.id
    };
  }

  setName(e: any) {
    this.setState({
      name: (e),
    });
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
  
  createIngredient(e: any) {
    e.preventDefault();
    fetch("http://localhost:3210/ingredient/create", {
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
            onChange={(e) => this.setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Quantity"
            variant="outlined"
            onChange={(e) => this.setQuantity(e.target.value)}
          />
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">Unit</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={this.state.measurement}
              onChange={(e) => this.setMeasurement(e.target.value)}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value="cup">Cup</MenuItem>
              <MenuItem value="tbls">Tbls</MenuItem>
            </Select>
          </FormControl>
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
