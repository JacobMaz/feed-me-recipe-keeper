import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import GetIngredientIndex from './GetIngredientIndex'

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            marginTop: '5em',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            height: '100%'
        }
    }),
);

interface Props {
    token: string | null
    activeRecipe: UserRecipe
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

const GetIngredient =(props: Props)=>{
    const classes = useStyles();

    console.log('GetIngredient')

    return(
        <Container className={classes.container}>
            <div>
                <h2>Ingredient Checklist</h2>
                <GetIngredientIndex activeRecipe={props.activeRecipe} token={props.token} />
            </div>
        </Container>
    )
}

export default GetIngredient;