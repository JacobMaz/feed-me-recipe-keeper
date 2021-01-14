import React, { Component } from "react";
import { createStyles, WithStyles, Theme, withStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import APIURL from "../../helpers/environment";
import recipeImage from '../../assets/katie-smith-uQs1802D0CQ-unsplash.png'


const styles = (theme: Theme) =>
  createStyles({
    container: {
      marginTop: "5em",
      backgroundColor: "gray",
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      height: "100%",
    },
    root: {
      width: '40vw',
      backgroundColor: '#FFAE6C',
      border: '3px solid #000A29',
      color: '#000A29',
      marginBottom: '1em'
    },
    media: {
      paddingTop: "56.25%",
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: '#000A29'
    }
  });

  interface GetRecipeState {
    allRecipe: AllRecipe[];
    message: string;
    expanded: boolean;
  }
  
  interface AllRecipe {
    id: number;
    recipeName: string;
    cuisine: string;
    prepTime: number;
    cookTime: number;
    directions: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
    user: User;
    ingredients: Ingredient[];
  }
  
  interface Ingredient {
    id: number;
    name: string;
    quantity: string;
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

interface Props extends WithStyles<typeof styles>{
  role: string | null
}

class GetRecipeIndex extends Component<Props, GetRecipeState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      allRecipe: [],
      message: '',
      expanded: false,
    };
  }

  allRecipes() {
    fetch(`${APIURL}/recipe/allrecipes`, {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          allRecipe: data.allRecipe,
        });
        console.log("response", data.allRecipe);
      });
  }

  componentDidMount() {
    this.allRecipes();
    console.log('role: ', this.props.role)
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.allRecipe.length > 0 &&
          this.state.allRecipe.map((recipe: AllRecipe, index: number) => (
            <div key={index}>
              <Card className={classes.root}>
                <CardHeader
                  avatar={<Avatar className={classes.avatar} aria-label="recipe">FM</Avatar>}
                  title={recipe.recipeName}
                  subheader={recipe.cuisine}
                />
                <CardMedia className={classes.media} image={recipeImage} />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Prep Time: {recipe.prepTime} mins
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Cook Time: {recipe.cookTime} mins
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: this.state.expanded,
                    })}
                    onClick={() => this.setState({expanded: !this.state.expanded})}
                    aria-expanded={this.state.expanded}
                    aria-label="show more"
                  >
                    <ExpandMore />
                  </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>Directions:</Typography>
                    <Typography paragraph>{recipe.directions}</Typography>
                  </CardContent>
                  {recipe.ingredients.length > 0 ? recipe.ingredients.map(
                        (ingredient: Ingredient, index: number) => (
                          <div key={index}>
                              <CardContent>
                        <Typography paragraph>Ingredients:</Typography>
                        <br />
                        <Typography paragraph>Main:</Typography>
                        {ingredient.ingredientType === 'Main' ? 
                        <div>
                          <Typography paragraph>{ingredient.name}: {ingredient.quantity} {ingredient.measurement}</Typography>
                        </div>
                        : null
                      }
                      <Typography paragraph>Produce:</Typography>
                      {ingredient.ingredientType === 'Produce' ? 
                        <div>
                          <Typography paragraph>{ingredient.name}: {ingredient.quantity} {ingredient.measurement}</Typography>
                        </div>
                        : null
                      }
                      <Typography paragraph>Sauces:</Typography>
                      {ingredient.ingredientType === 'Sauces' ? 
                        <div>
                          <Typography paragraph>{ingredient.name}: {ingredient.quantity} {ingredient.measurement}</Typography>
                        </div>
                        : null
                      }
                      <Typography paragraph>Sugar and Spices:</Typography>
                      {ingredient.ingredientType === 'Sugar and Spices' ? 
                        <div>
                          <Typography paragraph>{ingredient.name}: {ingredient.quantity} {ingredient.measurement}</Typography>
                        </div>
                        : null
                      }
                      <Typography paragraph>Baking:</Typography>
                      {ingredient.ingredientType === 'Baking' ? 
                        <div>
                          <Typography paragraph>{ingredient.name}: {ingredient.quantity} {ingredient.measurement}</Typography>
                        </div>
                        : null
                      }
                      </CardContent>
                          </div>
                        )
                      )
                      : null}
                </Collapse>
              </Card>
            </div>
          ))}
      </div>
    );
  }
}

export default withStyles(styles)(GetRecipeIndex);