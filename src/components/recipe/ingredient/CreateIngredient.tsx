import CreateIngredientIndex from './CreateIngredientIndex';
import { createStyles, makeStyles } from '@material-ui/core/styles'

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
  
  const useStyles = makeStyles(() =>
    createStyles({
        container: {
            display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                justifyContent: 'space-evenly',
            border: '5px solid #FFAE6C',
            borderRadius: '5px',
        },
        title: {
            marginTop: '0',
        }
    }),
);

const CreateIngredient = (props: Props) => {
  const classes = useStyles();

    return (
            <div className={classes.container}>
                <h3 className={classes.title}>Add Ingredient</h3>
                <CreateIngredientIndex activeRecipe={props.activeRecipe} token={props.token} />
            </div>
    )
}

export default CreateIngredient;