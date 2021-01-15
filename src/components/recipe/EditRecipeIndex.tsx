import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import APIURL from "../../helpers/environment";
import { createStyles, withStyles, WithStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    formControl: {
      backgroundColor: '#FFC28F',
      borderRadius: '6px',
      width: '20vw',
      "& label.Mui-focused": {
        color: "#000A29",
      },
      "& .MuiInput-underline:after": {
        color: '#000A29'
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#000A29",
          color: '#000A29'
        },
        "&:hover fieldset": {
          borderColor: "#D76100",
          color: '#000A29'
        },
        "&.Mui-focused fieldset": {
          borderColor: "#FFE500",
          color: '#000A29'
        }
      }
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    form: {
      height: '26em',
      display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    button: {
      backgroundColor: '#000A29',
      color: '#FFAE6C',
      '&:hover': {
          backgroundColor: '#DF6400',
        },
    },
    input: {
      backgroundColor: '#FFC28F',
      borderRadius: '6px',
      width: '20vw',
      "& label.Mui-focused": {
        color: "#000A29",
      },
      "& .MuiInput-underline:after": {
        color: '#000A29'
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#000A29",
          color: '#000A29'
        },
        "&:hover fieldset": {
          borderColor: "#D76100",
          color: '#000A29'
        },
        "&.Mui-focused fieldset": {
          borderColor: "#FFE500",
          color: '#000A29'
        }
      }
    },
  });

type EditRecipeState = {
  recipeName: string;
  cuisine: string;
  prepTime: number | null;
  cookTime: number | null;
  directions: string;
};

interface Props extends WithStyles<typeof styles>{
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
      fetch(`${APIURL}/recipe/${this.props.activeRecipe.id}`, {
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
    this.setState({
      cookTime: e,
    });
  }

  componentDidMount() {
    console.log("activeRecipe: ", this.props.activeRecipe);
    // console.log("recipe to edit: ", this.state.directions);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <h3>Edit Recipe</h3>
        <form className={classes.form} onSubmit={(e)=>this.editRecipe(e)}>
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Recipe Name"
            variant="outlined"
            value={this.state.recipeName}
            onChange={(e) => this.setState({recipeName: e.target.value})}
          />
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Cuisine"
            variant="outlined"
            value={this.state.cuisine}
            onChange={(e) => this.setState({cuisine: e.target.value})}
          />
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Prep Time"
            variant="outlined"
            value={this.state.prepTime}
            type='number'
            onChange={(e) => this.setPrepTime(e.target.value)}
          />
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Cook Time"
            variant="outlined"
            value={this.state.cookTime}
            type='number'
            onChange={(e) => this.setCookTime(e.target.value)}
          />
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Directions"
            variant="outlined"
            value={this.state.directions}
            onChange={(e) => this.setState({directions: e.target.value})}
          />
          <Button className={classes.button} type="submit" variant="contained">
            Submit Changes
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(EditRecipeIndex);
