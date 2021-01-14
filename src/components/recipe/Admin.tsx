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
  Menu,
  Button,
  Modal,
  Drawer,
  List,
  MenuItem,
} from "@material-ui/core";
import APIURL from "../../helpers/environment";
import recipeImage from '../../assets/katie-smith-uQs1802D0CQ-unsplash.png'
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { ExpandMore, MoreVert, Edit, DeleteOutline } from "@material-ui/icons";
import EditRecipeIndex from "./EditRecipeIndex";
import CreateIngredient from "./ingredient/CreateIngredient";
import GetIngredient from "./ingredient/GetIngredient";
import EditIngredient from "./ingredient/EditIngredient";


const styles = (theme: Theme) =>
  createStyles({
    container: {
      background: 'rgba(50, 50, 50, 0.5)',
      display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
      height: '70vh',
      width: '50vw',
      border: '5px solid #FFAE6C',
      borderRadius: '5px',
      overflow: 'auto'
  },
    root: {
      width: '40vw',
      backgroundColor: '#FFAE6C',
      border: '3px solid #000A29',
      color: '#000A29',
      marginTop: '1em',
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

interface Props extends WithStyles<typeof styles>{
  role: string | null
  token: string | null
}

interface UserRecipesState {
    userRecipes: UserRecipe[];
    expanded: boolean;
    open: boolean;
    editOpen: boolean;
    ingredientIsOpen: boolean;
    recipe: UserRecipe[];
    visible: boolean
    drawer: boolean
    message: string;
    activeRecipe: UserRecipe
    activeIngredient: Ingredient
    editIngredient: boolean
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

class Admin extends Component<Props, UserRecipesState> {
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
        message: '',
        activeRecipe: {
          id: 0,
      recipeName: '',
      cuisine: '',
      prepTime: 0,
      cookTime: 0,
      directions:'',
      createdAt: '',
      updatedAt: '',
      userId: 0,
      user: [],
      ingredients: []
        },
        activeIngredient: {
          id: 0,
      name: '',
      quantity: 0,
      measurement: '',
      ingredientType: '',
      createdAt: '',
      updatedAt: '',
      recipeId: 0,
      userId: 0
        },
        editIngredient: false
    };
  }

  allRecipes() {
    fetch(`${APIURL}/recipe/allrecipes`, {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          userRecipes: data.allRecipe,
        });
        console.log("userRecipes", this.state.userRecipes);
      });
  }

  deleteRecipe(recipe: UserRecipe) {
    // console.log('deleteRecipe', this.props.token)
    fetch(`${APIURL}/recipe/${recipe.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${this.props.token}`,
      }),
    }).then(() => console.log(this.state.userRecipes));
  }

  deleteIngredient(ingredient: Ingredient) {
    // console.log('deleteRecipe', this.props.token)
    fetch(`${APIURL}/ingredient/${ingredient.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${this.props.token}`,
      }),
    }).then(() => console.log(this.state.userRecipes));
  }

  componentDidMount() {
    this.allRecipes();
    console.log('role: ', this.props.role);
    console.log('userRecipes State: ', this.state.userRecipes)
  }

  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.container}>
        <div>
          {this.state.userRecipes === [] ? null :
          this.state.userRecipes.map((recipe: UserRecipe, index: number) => (
            <div key={index}>
              <Card className={classes.root}>
              <CardHeader
    avatar={<Avatar className={classes.avatar} aria-label="recipe">FM</Avatar>}
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
                      activeRecipe={this.state.activeRecipe}
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
                      activeRecipe={this.state.activeRecipe}
                      token={this.props.token}
                    />
                  </div>
                </Modal>
                <Drawer anchor='right' open={this.state.drawer} onClose={()=>this.setState({drawer: false})} >
                      <List className={clsx(classes.list)}>
                        <GetIngredient activeRecipe={this.state.activeRecipe} token={this.props.token} />
                      </List>
                </Drawer>
                <MenuItem
                  onClick={() => {
                    this.setState({ingredientIsOpen: true});
                    this.setState({activeRecipe: recipe});
                  }}
                >
                  Add Ingredient
                </MenuItem>
                <MenuItem onClick={() => {
                  this.setState({drawer: true});
                  this.setState({activeRecipe: recipe});
                  }}> 
                  Ingredient Checklist
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    this.setState({editOpen: true});
                    this.setState({activeRecipe: recipe});
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
                        {this.state.editIngredient === false ?
                        <Typography paragraph>{ingredient.name} {ingredient.quantity} {ingredient.measurement} <button onClick={()=> {this.setState({activeIngredient: ingredient, editIngredient: true}); console.log('activeIngedient', this.state.activeIngredient)}} ><Edit /></button>
                        <button><DeleteOutline onClick={()=>this.deleteIngredient(ingredient)}/></button></Typography>
                        : <div><EditIngredient ingredient={ingredient} token={this.props.token} /><button onClick={()=>{this.setState({editIngredient: false})}}>Cancel</button></div>
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

export default withStyles(styles)(Admin);