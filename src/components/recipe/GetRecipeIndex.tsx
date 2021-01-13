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
import GetRecipeState from '../interface/GetRecipeState'
import AllRecipe from '../interface/AllRecipeInterface'
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

//   admin(){
//     return this.props.role === 'admin' ? 
//     <CardHeader
//     avatar={<Avatar className={classes.avatar} aria-label="recipe">FM</Avatar>}
//     action={
//       <IconButton aria-label="settings">
//         <PopupState
//           variant="popover"
//           popupId="demo-popup-menu"
//         >
//           {(popupState) => (
//             <React.Fragment>
//               <MoreVert {...bindTrigger(popupState)} />
//               <Menu {...bindMenu(popupState)}>
//                 <Modal
//                   open={this.state.open}
//                   onClose={() => this.setState({open: false})}
//                   aria-labelledby="simple-modal-title"
//                   aria-describedby="simple-modal-description"
//                 >
//                   <div className={classes.paper}>
//                     <h2 id="simple-modal-title">Warning!</h2>
//                     <p>You are about to DELETE a recipe!</p>
//                     <Button
//                       onClick={() =>
//                         this.deleteRecipe(recipe)
//                       }
//                     >
//                       Delete Recipe
//                     </Button>
//                     <Button>Cancel</Button>
//                   </div>
//                 </Modal>
//                 <Modal
//                   open={this.state.editOpen}
//                   onClose={() => this.setState({editOpen: false})}
//                   aria-labelledby="simple-modal-title"
//                   aria-describedby="simple-modal-description"
//                 >
//                   <div className={classes.paper}>
//                     <h2 id="simple-modal-title">
//                       Edit Recipe
//                     </h2>
//                     <EditRecipeIndex
//                       activeRecipe={this.state.activeRecipe}
//                       token={this.props.token}
//                     />
//                   </div>
//                 </Modal>
//                 <Modal
//                   open={this.state.ingredientIsOpen}
//                   onClose={() => this.setState({ingredientIsOpen: false})}
//                   aria-labelledby="simple-modal-title"
//                   aria-describedby="simple-modal-description"
//                 >
//                   <div className={classes.paper}>
//                     <h2 id="simple-modal-title">
//                       Add Ingredient
//                     </h2>
//                     <CreateIngredient
//                       activeRecipe={this.state.activeRecipe}
//                       token={this.props.token}
//                     />
//                   </div>
//                 </Modal>
//                 <Drawer anchor='right' open={this.state.drawer} onClose={()=>this.setState({drawer: false})} >
//                       <List className={clsx(classes.list)}>
//                         <GetIngredient activeRecipe={this.state.activeRecipe} token={this.props.token} />
//                       </List>
//                 </Drawer>
//                 <MenuItem
//                   onClick={() => {
//                     this.setState({ingredientIsOpen: true});
//                     this.setState({activeRecipe: recipe});
//                   }}
//                 >
//                   Add Ingredient
//                 </MenuItem>
//                 <MenuItem onClick={() => {
//                   this.setState({drawer: true});
//                   this.setState({activeRecipe: recipe});
//                   }}> 
//                   Ingredient Checklist
//                 </MenuItem>
//                 <MenuItem
//                   onClick={() => {
//                     this.setState({editOpen: true});
//                     this.setState({activeRecipe: recipe});
//                   }}
//                 >
//                   Edit Recipe
//                 </MenuItem>
//                 <MenuItem onClick={() => this.setState({open: true})}>
//                   Delete Recipe
//                 </MenuItem>
//               </Menu>
//             </React.Fragment>
//           )}
//         </PopupState>
//       </IconButton>
//     }
//     title={recipe.recipeName}
//     subheader={recipe.cuisine}
//   />
//   : <CardHeader
//   avatar={<Avatar className={classes.avatar} aria-label="recipe">FM</Avatar>}
//   title={recipe.recipeName}
//   subheader={recipe.cuisine}
// />
//   }

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
                </Collapse>
              </Card>
            </div>
          ))}
      </div>
    );
  }
}

export default withStyles(styles)(GetRecipeIndex);