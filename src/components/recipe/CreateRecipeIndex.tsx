import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import APIURL from "../../helpers/environment";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import {Link} from 'react-router-dom';

interface RecipeState {
  recipeName: string;
  cuisine: string;
  prepTime: number | null | string;
  cookTime: number | string;
  directions: string;
}

const styles =()=>
    createStyles({
        form: {
            display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around',
            height: '60vh',
            marginBottom: '3vh'
        },
        button: {
            backgroundColor: '#FFAE6C',
            color: '#000A29',
            '&:hover': {
                backgroundColor: '#DF6400',
              },
            },
            link: {
              textDecoration: 'none'
          },
        input: {
            backgroundColor: '#FFAE6C',
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
          inputDirections: {
            backgroundColor: '#FFAE6C',
            borderRadius: '6px',
            width: '30vw',
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
          }
    })

interface Token extends WithStyles<typeof styles>{
  token: string | null
}

class CreateRecipeIndex extends Component<Token, RecipeState> {
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
    const{classes} = this.props
    return (
      <div>
        <form className={classes.form} onSubmit={(e) => this.createRecipe(e)}>
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Recipe Name"
            variant="outlined"
            onChange={(e) => this.setState({recipeName: e.target.value})}
          />
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Cuisine"
            variant="outlined"
            onChange={(e) => this.setState({cuisine: e.target.value})}
          />
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Prep Time(in mins)"
            variant="outlined"
            type='number'
            onChange={(e) => this.setState({prepTime: e.target.value})}
          />
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Cook Time(in mins)"
            variant="outlined"
            type='number'
            onChange={(e) => this.setState({cookTime: e.target.value})}
          />
          <TextField
            className={classes.inputDirections}
            id="outlined-basic"
            label="Directions"
            variant="outlined"
            multiline
            rowsMax={10}
            onChange={(e) => this.setState({directions: e.target.value})}
          />
            <Button className={classes.button} type="submit" variant="contained">
            Add Recipe
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(CreateRecipeIndex);