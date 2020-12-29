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

interface Props {
    token: string
}

const CreateRecipe = (props: Props) => {
    const classes = useStyles();

    return (
        <Container className={classes.container} >
            <div>
                <h1>Create Recipe</h1>
                <CreateRecipeIndex token={props.token} />
            </div>
        </Container>
    )
}

export default CreateRecipe;