import React, { Component } from "react";
import { ExpandMore, MoreVert, Edit, DeleteOutline } from "@material-ui/icons";
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
  Menu,
  MenuItem,
  Button,
  Modal,
  Drawer,
  List,
  TextField
} from "@material-ui/core";
import { createStyles, withStyles, WithStyles, Theme } from "@material-ui/core/styles";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import clsx from "clsx";
import EditRecipeIndex from "./EditRecipeIndex";
import CreateIngredient from "./ingredient/CreateIngredient";
import GetIngredient from "./ingredient/GetIngredient";
import UserRecipesState from '../interface/UserRecipeState'
import UserRecipe from '../interface/UserRecipe'

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
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    list: {
      width: 250,
    },
  });

interface Props extends WithStyles<typeof styles> {
  token: string | null;
}

class UserRecipesIndex extends Component<Props, UserRecipesState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      userRecipes: [{
        id: 0,
        recipeName: '',
        cuisine: '',
        prepTime: null,
        cookTime: 0,
        directions: '',
        createdAt: '',
        updatedAt: '',
        userId: 0,
        user: [{
          id: 0,
          firstName: '',
          lastName: '',
          userName: '',
          email: '',
          password: '',
          role: '',
          createdAt: '',
          updatedAt: '',
        }],
        ingredients: [{
          id: 0,
          name: '',
          quantity: 0,
          measurement: '',
          ingredientType: '',
          createdAt: '',
          updatedAt: '',
          recipeId: 0,
          userId: 0
        }]
      }],
      expanded: false,
      open: false,
      editOpen: false,
      recipeToEdit: [{
        id: 0,
        recipeName: '',
        cuisine: '',
        prepTime: null,
        cookTime: 0,
        directions: '',
        createdAt: '',
        updatedAt: '',
        userId: 0,
        user: [{
          id: 0,
          firstName: '',
          lastName: '',
          userName: '',
          email: '',
          password: '',
          role: '',
          createdAt: '',
          updatedAt: '',
        }],
        ingredients: [{
          id: 0,
          name: '',
          quantity: 0,
          measurement: '',
          ingredientType: '',
          createdAt: '',
          updatedAt: '',
          recipeId: 0,
          userId: 0
        }]
      }],
      ingredientIsOpen: false,
      recipe: [{
        id: 0,
        recipeName: '',
        cuisine: '',
        prepTime: null,
        cookTime: 0,
        directions: '',
        createdAt: '',
        updatedAt: '',
        userId: 0,
        user: [{
          id: 0,
          firstName: '',
          lastName: '',
          userName: '',
          email: '',
          password: '',
          role: '',
          createdAt: '',
          updatedAt: '',
        }],
        ingredients: [{
          id: 0,
          name: '',
          quantity: 0,
          measurement: '',
          ingredientType: '',
          createdAt: '',
          updatedAt: '',
          recipeId: 0,
          userId: 0
        }]
      }],
      visible: false,
      drawer: false,
      editIngredient: '',
      message: ''
    };
  }

  userRecipes() {
    fetch("http://localhost:3210/recipe/userrecipes", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${this.props.token}`,
      }),
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          userRecipes: data.userRecipes,
        });
        console.log("response", data.userRecipes);
      });
  }

  componentDidMount() {
    this.userRecipes();
    console.log("TOKEN: ", this.props.token);
    console.log('editIngreidient: ', this.state.editIngredient)
  }

  deleteRecipe(recipe: UserRecipe) {
    // console.log('deleteRecipe', this.props.token)
    fetch(`http://localhost:3210/recipe/${recipe.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${this.props.token}`,
      }),
    }).then(() => console.log(this.state.userRecipes));
  }

  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.container}>
        <div>
          <h1>My Recipes</h1>
          {this.state.userRecipes === []
            ? null
            : this.state.userRecipes.map((recipe: any, index: number) => (
                  <div key={index}>
                  <Card className={classes.root}>
                    <CardHeader
                      avatar={<Avatar aria-label="recipe">R</Avatar>}
                      action={
                        <IconButton aria-label="settings">
                          <PopupState
                            variant="popover"
                            popupId="demo-popup-menu"
                          >
                            {(popupState) => (
                              <React.Fragment>
                                <MoreVert {...bindTrigger(popupState)} />
                                <Menu {...bindMenu(popupState)}>
                                  <Modal
                                    open={this.state.open}
                                    onClose={() => this.setState({open: false})}
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                  >
                                    <div className={classes.paper}>
                                      <h2 id="simple-modal-title">Warning!</h2>
                                      <p>You are about to DELETE a recipe!</p>
                                      <Button
                                        onClick={() =>
                                          this.deleteRecipe(recipe)
                                        }
                                      >
                                        Delete Recipe
                                      </Button>
                                      <Button>Cancel</Button>
                                    </div>
                                  </Modal>
                                  <Modal
                                    open={this.state.editOpen}
                                    onClose={() => this.setState({editOpen: false})}
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                  >
                                    <div className={classes.paper}>
                                      <h2 id="simple-modal-title">
                                        Edit Recipe
                                      </h2>
                                      <EditRecipeIndex
                                        recipeToEdit={this.state.recipeToEdit}
                                        token={this.props.token}
                                      />
                                    </div>
                                  </Modal>
                                  <Modal
                                    open={this.state.ingredientIsOpen}
                                    onClose={() => this.setState({ingredientIsOpen: false})}
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                  >
                                    <div className={classes.paper}>
                                      <h2 id="simple-modal-title">
                                        Add Ingredient
                                      </h2>
                                      <CreateIngredient
                                        recipe={this.state.recipe}
                                        token={this.props.token}
                                      />
                                    </div>
                                  </Modal>
                                  <Drawer anchor='right' open={this.state.drawer} onClose={()=>this.setState({drawer: false})} >
                                        <List className={clsx(classes.list)}>
                                          <GetIngredient recipe={this.state.recipe} token={this.props.token} />
                                        </List>
                                  </Drawer>
                                  <MenuItem
                                    onClick={() => {
                                      this.setState({ingredientIsOpen: true});
                                      this.setState({recipe: recipe});
                                    }}
                                  >
                                    Add Ingredient
                                  </MenuItem>
                                  <MenuItem onClick={() => {
                                    this.setState({drawer: true});
                                    this.setState({recipe: recipe});
                                    }}>
                                    View Ingredients
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => {
                                      this.setState({editOpen: true});
                                      this.setState({recipeToEdit: recipe});
                                    }}
                                  >
                                    Edit Recipe
                                  </MenuItem>
                                  <MenuItem onClick={() => this.setState({open: true})}>
                                    Delete Recipe
                                  </MenuItem>
                                </Menu>
                              </React.Fragment>
                            )}
                          </PopupState>
                        </IconButton>
                      }
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
                    <Collapse
                      in={this.state.expanded}
                      timeout="auto"
                      unmountOnExit
                    >
                      <CardContent>
                        <Typography paragraph>Directions:</Typography>
                        <Typography paragraph>{recipe.directions}</Typography>
                      </CardContent>
                      {recipe.ingredients.length > 0 ? recipe.ingredients.map(
                        (ingredient: any, index: number) => (
                          <div key={index}>
                              <CardContent>
                        <Typography paragraph>Ingredients:</Typography>
                        {this.state.editIngredient === '' ?
                        <Typography paragraph>{ingredient.name} {ingredient.quantity} {ingredient.measurement} <button onClick={()=> {this.setState({editIngredient: ingredient}); console.log('editIngedient', this.state.editIngredient)}} ><Edit /></button>
                        <button><DeleteOutline /></button></Typography>
                        : <div>
                          <input placeholder={ingredient.name} />
                          <input placeholder={ingredient.quantity} />
                          <input placeholder={ingredient.measurement} />
                          <button onClick={()=>{this.setState({editIngredient: ''})}}>Cancel</button>
                        </div>
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
      </Container>
    );
  }
}

export default withStyles(styles)(UserRecipesIndex);
