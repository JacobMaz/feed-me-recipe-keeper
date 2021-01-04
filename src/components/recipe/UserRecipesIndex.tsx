import React, { Component } from 'react';
import { ExpandMore, MoreVert } from '@material-ui/icons'
import { Container, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography, Menu, MenuItem, Button, Modal } from '@material-ui/core'
import { createStyles, withStyles } from '@material-ui/core/styles'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import clsx from 'clsx'

const styles = (theme: any) =>
    createStyles({
        container: {
            marginTop: '5em',
            backgroundColor: 'gray',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            height: '100%'
        },
        root: {
            maxWidth: 345
        },
        media: {
            height: 0,
            paddingTop: '56.25%'
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)'
        },
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    });

type UserRecipesState = {
    userRecipeState: any
    expanded: boolean
    open: boolean
}

interface Props {
    token: string | null
    classes: any
}

class UserRecipesIndex extends Component<Props, UserRecipesState>{
    constructor(props: any) {
        super(props)
        this.state = {
            userRecipeState: [],
            expanded: false,
            open: false
        }
    }

    userRecipes() {
        fetch('http://localhost:3210/recipe/userrecipes', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.token}`
            })
        })
            .then((res) => res.json())
            .then(data => {
                this.setState({
                    userRecipeState: data.userRecipes
                })
                console.log('response', data.userRecipes)
            })
    }

    componentDidMount() {
        this.userRecipes()
        console.log('TOKEN: ', this.props.token)
    }

    deleteRecipe(recipe: any) {
        // console.log('deleteRecipe', this.props.token)
        fetch(`http://localhost:3210/recipe/${recipe.id}`, {
            method: 'DELETE',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `${this.props.token}`
            })
        })
            .then(() => console.log(this.state.userRecipeState))
    }

    handleExpandClick() {
        this.setState({
            expanded: !this.state.expanded
        })
    };

    handleOpen() {
        this.setState({
            open: true
        })
    };

    handleClose() {
        this.setState({
            open: false
        })
    };

    handleView() {
        return
    }

    render() {
        const { classes } = this.props;
        return (
            <Container className={classes.container}>
                <div>
                    <h1>My Recipes</h1>
                    {this.state.userRecipeState === [] ?
                        null :
                        this.state.userRecipeState.map((recipe: any, index: any) =>
                            <div key={index}>
                                <Card className={classes.root}>
                                    <CardHeader
                                        avatar={<Avatar aria-label='recipe'>
                                            R
                    </Avatar>} action={<IconButton aria-label='settings'>
                                            <PopupState variant='popover' popupId='demo-popup-menu'>
                                                {(popupState) => (
                                                    <React.Fragment>
                                                        <MoreVert {...bindTrigger(popupState)} />
                                                        <Menu {...bindMenu(popupState)}>
                                                            <Modal open={this.state.open} onClose={() => this.handleClose()} aria-labelledby='simple-modal-title' aria-describedby='simple-modal-description' >
                                                                <div className={classes.paper}>
                                                                    <h2 id='simple-modal-title'>Warning!</h2>
                                                                    <p>You are about to DELETE a recipe!</p>
                                                                    <Button onClick={()=>this.deleteRecipe(recipe)}>Delete Recipe</Button>
                                                                    <Button>Cancel</Button>
                                                                </div>
                                                            </Modal>
                                                            <MenuItem onClick={popupState.close}>Edit Recipe</MenuItem>
                                                            <MenuItem onClick={() => this.handleOpen()}>Delete Recipe</MenuItem>
                                                        </Menu>
                                                    </React.Fragment>
                                                )}
                                            </PopupState>
                                        </IconButton>} title={recipe.recipeName} subheader={recipe.user.userName} />
                                    <CardMedia className={classes.media} image='' />
                                    <CardContent>
                                        <Typography variant='body2' color='textSecondary' component='p' >
                                            Prep Time: {recipe.prepTime}
                                        </Typography>
                                        <Typography variant='body2' color='textSecondary' component='p' >
                                            Cook Time: {recipe.cookTime}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing >
                                        <IconButton className={clsx(classes.expand, {
                                            [classes.expandOpen]: this.state.expanded
                                        })} onClick={() => this.handleExpandClick()} aria-expanded={this.state.expanded} aria-label='show more' >
                                            <ExpandMore />
                                        </IconButton>
                                    </CardActions>
                                    <Collapse in={this.state.expanded} timeout='auto' unmountOnExit >
                                        <CardContent>
                                            <Typography paragraph>Directions:</Typography>
                                            <Typography paragraph>{recipe.directions}</Typography>
                                        </CardContent>
                                    </Collapse>
                                </Card>
                            </div>
                        )}
                </div>
            </Container>
        )
    }
}

export default withStyles(styles)(UserRecipesIndex);