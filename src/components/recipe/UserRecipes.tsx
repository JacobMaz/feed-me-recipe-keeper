import React from 'react'
import { ExpandMore, MoreVert } from '@material-ui/icons'
import { Container, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography, } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) =>
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
    }),
);

interface Props {
    deleteRecipe:(recipe: any) => void,
    userRecipes: []
}

const UserRecipes = (props: Props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    console.log('user recipes: ', props.userRecipes)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleView = () => {
        return props.userRecipes === [] ?
            null :
            props.userRecipes.map((recipe: any, index: any) =>
                <div key={index}>
                    <Card className={classes.root}>
                        <CardHeader avatar={<Avatar aria-label='recipe'>
                            R
                    </Avatar>} action={<IconButton aria-label='settings'><MoreVert /></IconButton>} title={recipe.recipeName} subheader={recipe.user.userName} />
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
                                [classes.expandOpen]: expanded
                            })} onClick={handleExpandClick} aria-expanded={expanded} aria-label='show more' >
                                <ExpandMore />
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded} timeout='auto' unmountOnExit >
                            <CardContent>
                                <Typography paragraph>Directions:</Typography>
                                <Typography paragraph>{recipe.directions}</Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </div>
            )
    }

    return (
        <Container className={classes.container} >
            <div>
                <h1>My Recipes</h1>
                {handleView()}
            </div>
        </Container>
    )
}

export default UserRecipes;