import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import CreateRecipeIndex from './CreateRecipeIndex';

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            marginTop: '5em',
            backgroundColor: 'gray',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            height: '100%'
        }
    }),
);

const CreateRecipe = () => {
    const classes = useStyles();

    return (
        <Container className={classes.container} >
            <div>
                <h1>Create Recipe</h1>
                <CreateRecipeIndex />
            </div>
        </Container>
    )
}

export default CreateRecipe;