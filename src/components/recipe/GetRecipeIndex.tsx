import React, { Component } from "react";
import { createStyles, WithStyles, Theme, withStyles} from "@material-ui/core/styles";
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
import GetRecipeState from '../interface/GetRecipeState'
import AllRecipe from '../interface/AllRecipeInterface'
import APIURL from "../../helpers/environment";

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

interface Props extends WithStyles<typeof styles>{}

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
  }

  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.container}>
        <h1>All Recipes</h1>
        {this.state.allRecipe.length > 0 &&
          this.state.allRecipe.map((recipe: AllRecipe, index: number) => (
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
                </Collapse>
              </Card>
            </div>
          ))}
      </Container>
    );
  }
}

export default withStyles(styles)(GetRecipeIndex);