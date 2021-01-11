import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import GetIngredientIndex from './GetIngredientIndex'

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
    token: string | null
    recipe: any
}

const GetIngredient =(props: Props)=>{
    const classes = useStyles();

    console.log('GetIngredient')

    return(
        <Container className={classes.container}>
            <div>
                <h2>Ingredient Checklist</h2>
                <GetIngredientIndex recipe={props.recipe} token={props.token} />
            </div>
            
        </Container>
    )
}

export default GetIngredient;