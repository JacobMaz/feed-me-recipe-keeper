import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import CreateRecipeIndex from './CreateRecipeIndex';
import Token from '../interface/TokenProp'

const useStyles = makeStyles(() =>
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
        createRecipeDiv: {
            display: 'flex',
                alignItems:'center',
                flexDirection:'column'
        },
        title: {
            color: '#FFAE6C',
            marginTop: '3'
        }
    }),
);

const CreateRecipe = (props: Token) => {
    const classes = useStyles();

    return (
        <Container className={classes.container} >
            <div className={classes.createRecipeDiv}>
                <h1 className={classes.title}>Create Recipe</h1>
                <CreateRecipeIndex token={props.token} />
            </div>
        </Container>
    )
}

export default CreateRecipe;