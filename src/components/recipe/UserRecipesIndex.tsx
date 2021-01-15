import React, { Component } from "react";
import { ExpandMore, MoreVert, Edit, DeleteOutline } from "@material-ui/icons";
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
  Menu,
  MenuItem,
  Button,
  Drawer,
  List,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme,
} from "@material-ui/core/styles";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import clsx from "clsx";
import EditRecipeIndex from "./EditRecipeIndex";
import GetIngredient from "./ingredient/GetIngredient";
// import UserRecipesState from '../interface/UserRecipeState'
// import UserRecipe from '../interface/UserRecipe'
import EditIngredient from "./ingredient/EditIngredient";
import APIURL from "../../helpers/environment";
import recipeImage from "../../assets/katie-smith-uQs1802D0CQ-unsplash.png";
import CreateIngredient from "./ingredient/CreateIngredient";

const styles = (theme: Theme) =>
  createStyles({
    dialog: {
      display: 'flex',
        justifyContent:'space-evenly',
        alignItems: 'center',
        flexDirection: 'column',
      height: '25em',
      backgroundColor: "#FFAE6C",
      border: "3px solid #000A29",
      color: "#000A29",
      overflow: 'auto'
    },
    editDialog: {
      display: 'flex',
        justifyContent:'space-evenly',
        alignItems: 'center',
        flexDirection: 'column',
      height: '30em',
      backgroundColor: "#FFAE6C",
      border: "3px solid #000A29",
      color: "#000A29",
      overflow: 'auto'
    },
    root: {
      width: "40vw",
      backgroundColor: "#FFAE6C",
      border: "3px solid #000A29",
      color: "#000A29",
      marginBottom: "1em",
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
    paper: {
      // position: "absolute",
      width: 400,
      backgroundColor: "#FFAE6C",
      border: "3px solid #000A29",
      color: "#000A29",
      overflow: 'auto',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    list: {
      // width: 250,
      height: '100%',
      backgroundColor: "#FFAE6C",
      borderLeft: "3px solid #000A29",
      color: "#000A29",
    },
    avatar: {
      backgroundColor: "#000A29",
    },
    menuItem: {
      backgroundColor: "#FFAE6C",
      color: "#000A29",
    },
    button: {
      backgroundColor: '#000A29',
      marginRight: '1em',
      color: '#FFAE6C',
      '&:hover': {
          backgroundColor: '#DF6400',
        },
    },
  });

interface UserRecipesState {
  userRecipes: UserRecipe[];
  expanded: boolean;
  open: boolean;
  editOpen: boolean;
  ingredientIsOpen: boolean;
  recipe: UserRecipe[];
  visible: boolean;
  drawer: boolean;
  message: string;
  activeRecipe: UserRecipe;
  activeIngredient: Ingredient;
  editIngredient: boolean;
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

interface Props extends WithStyles<typeof styles> {
  token: string | null;
}

class UserRecipesIndex extends Component<Props, UserRecipesState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      userRecipes: [],
      expanded: false,
      open: false,
      editOpen: false,
      ingredientIsOpen: false,
      recipe: [],
      visible: false,
      drawer: false,
      message: "",
      activeRecipe: {
        id: 0,
        recipeName: "",
        cuisine: "",
        prepTime: 0,
        cookTime: 0,
        directions: "",
        createdAt: "",
        updatedAt: "",
        userId: 0,
        user: [],
        ingredients: [],
      },
      activeIngredient: {
        id: 0,
        name: "",
        quantity: 0,
        measurement: "",
        ingredientType: "",
        createdAt: "",
        updatedAt: "",
        recipeId: 0,
        userId: 0,
      },
      editIngredient: false,
    };
  }

  userRecipes() {
    fetch(`${APIURL}/recipe/userrecipes`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${this.props.token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          userRecipes: data.userRecipes,
        });
        console.log("response", data.userRecipes);
      });
  }

  componentDidMount() {
    this.userRecipes();
    console.log("TOKEN: ", this.props.token);
    console.log("activeIngredient: ", this.state.activeIngredient);
  }

  deleteRecipe(recipe: UserRecipe) {
    // console.log('deleteRecipe', this.props.token)
    fetch(`${APIURL}/recipe/${recipe.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${this.props.token}`,
      }),
    }).then(() => {
      console.log('Recipe Deleted')
    })
    .catch(error=> console.log(error))
  }

  deleteIngredient(ingredient: Ingredient) {
    // console.log('deleteRecipe', this.props.token)
    fetch(`${APIURL}/ingredient/${ingredient.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${this.props.token}`,
      }),
    }).then(() => console.log(this.state.userRecipes))
    .catch(error=> console.log(error))
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.userRecipes === []
          ? null
          : this.state.userRecipes.map((recipe: UserRecipe, index: number) => (
              <div key={index}>
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar className={classes.avatar} aria-label="recipe">
                        FM
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <PopupState variant="popover" popupId="demo-popup-menu">
                          {(popupState) => (
                            <React.Fragment>
                              <MoreVert {...bindTrigger(popupState)} />
                                <Menu className='menu' {...bindMenu(popupState)}>
                                  <Dialog
                                    open={this.state.ingredientIsOpen}
                                    onClose={() =>
                                      this.setState({ ingredientIsOpen: false })
                                    } aria-labelledby='form-dialog-title'>
                                      <DialogContent className={classes.dialog}>
                                        <CreateIngredient
                                        activeRecipe={this.state.activeRecipe}
                                        token={this.props.token}
                                      />
                                      </DialogContent>
                                  </Dialog>
                                  <Dialog
                                    open={this.state.open}
                                    onClose={() =>
                                      this.setState({ open: false })
                                    }
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                  >
                                    <div className={classes.paper}>
                                      <h2 id="simple-modal-title">Warning!</h2>
                                      <p>You are about to DELETE a recipe!</p>
                                      <Button
                                        className={classes.button}
                                        onClick={() =>
                                          this.deleteRecipe(recipe)
                                        }
                                      >
                                        Delete Recipe
                                      </Button>
                                      <Button className={classes.button} onClick={() =>this.setState({ open: false })} >Cancel</Button>
                                    </div>
                                  </Dialog>
                                  <Dialog
                                    open={this.state.editOpen}
                                    onClose={() =>
                                      this.setState({ editOpen: false })
                                    }
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                  >
                                    <DialogContent className={classes.editDialog}>
                                        <EditRecipeIndex
                                        activeRecipe={this.state.activeRecipe}
                                        token={this.props.token}
                                      />
                                    </DialogContent>   
                                  </Dialog>
                                  <Drawer
                                    anchor="right"
                                    open={this.state.drawer}
                                    onClose={() =>
                                      this.setState({ drawer: false })
                                    }
                                  >
                                    <List className={clsx(classes.list)}>
                                      <GetIngredient
                                        activeRecipe={this.state.activeRecipe}
                                        token={this.props.token}
                                      />
                                    </List>
                                  </Drawer>
                                  <MenuItem
                                    className={classes.menuItem}
                                    onClick={() => {
                                      this.setState({ ingredientIsOpen: true });
                                      this.setState({ activeRecipe: recipe });
                                    }}
                                  >
                                    Add Ingredient
                                  </MenuItem>
                                  <MenuItem
                                    className={classes.menuItem}
                                    onClick={() => {
                                      this.setState({ drawer: true });
                                      this.setState({ activeRecipe: recipe });
                                    }}
                                  >
                                    Ingredient Checklist
                                  </MenuItem>
                                  <MenuItem
                                    className={classes.menuItem}
                                    onClick={() => {
                                      this.setState({ editOpen: true });
                                      this.setState({ activeRecipe: recipe });
                                    }}
                                  >
                                    Edit Recipe
                                  </MenuItem>
                                  <MenuItem
                                    className={classes.menuItem}
                                    onClick={() =>
                                      this.setState({ open: true })
                                    }
                                  >
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
                  <CardMedia className={classes.media} image={recipeImage} />
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
                      onClick={() =>
                        this.setState({ expanded: !this.state.expanded })
                      }
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
                    {recipe.ingredients.length > 0
                      ? recipe.ingredients.map(
                          (ingredient: Ingredient, index: number) => (
                            <div key={index}>
                              <CardContent>
                                <Typography paragraph>Ingredients:</Typography>
                                {this.state.editIngredient === false ? (
                                  <Typography paragraph>
                                    {ingredient.name} {ingredient.quantity}{" "}
                                    {ingredient.measurement}{" "}
                                    <button
                                      onClick={() => {
                                        this.setState({
                                          activeIngredient: ingredient,
                                          editIngredient: true,
                                        });
                                        console.log(
                                          "activeIngedient",
                                          this.state.activeIngredient
                                        );
                                      }}
                                    >
                                      <Edit />
                                    </button>
                                    <button>
                                      <DeleteOutline
                                        onClick={() =>
                                          this.deleteIngredient(ingredient)
                                        }
                                      />
                                    </button>
                                  </Typography>
                                ) : (
                                  <div>
                                    <EditIngredient
                                      ingredient={ingredient}
                                      token={this.props.token}
                                    />
                                    <button
                                      onClick={() => {
                                        this.setState({
                                          editIngredient: false,
                                        });
                                      }}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                )}
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

export default withStyles(styles)(UserRecipesIndex);
