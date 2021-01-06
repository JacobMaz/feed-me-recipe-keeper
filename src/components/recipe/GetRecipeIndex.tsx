import React, { Component } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  Container,
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

const styles = (theme: any) =>
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
      maxWidth: 345,
    },
    media: {
      height: 0,
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
  });

type GetRecipeState = {
  recipeResponse: any;
  expanded: boolean;
};

interface Props {
  classes: any;
}

class GetRecipeIndex extends Component<Props, GetRecipeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      recipeResponse: [],
      expanded: false,
    };
  }

  allRecipes() {
    fetch("http://localhost:3210/recipe/allrecipes", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          recipeResponse: data.allRecipe,
        });
        console.log("response", data.allRecipe);
      });
  }

  componentDidMount() {
    this.allRecipes();
  }

  handleExpandClick() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.container}>
        <h1>All Recipes</h1>
        {this.state.recipeResponse.length > 0 &&
          this.state.recipeResponse.map((recipe: any, index: any) => (
            <div key={index}>
              <Card className={classes.root}>
                <CardHeader
                  avatar={<Avatar aria-label="recipe">R</Avatar>}
                  title={recipe.recipeName}
                  subheader={recipe.cuisine}
                />
                <CardMedia className={classes.media} image="" />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Prep Time: {recipe.prepTime}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Cook Time: {recipe.cookTime}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: this.state.expanded,
                    })}
                    onClick={() => this.handleExpandClick()}
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
                </Collapse>
              </Card>
            </div>
          ))}
      </Container>
    );
  }
}

export default withStyles(styles)(GetRecipeIndex);
