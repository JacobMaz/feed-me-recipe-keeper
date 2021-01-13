import GetRecipeIndex from './GetRecipeIndex';
import {Container} from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'

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
        allRecipesDiv: {
            display: 'flex',
                alignItems:'center',
                flexDirection:'column',
                justifyContent: 'space-between',
        },
        title: {
            color: '#FFAE6C',
        }
    }),
);

const GetRecipe = () => {
    const classes = useStyles();
    
    return (
        <Container className={classes.container}>
            <div className={classes.allRecipesDiv}>
               <h1 className={classes.title}>All Recipes</h1>
                <GetRecipeIndex /> 
            </div>
        </Container>
    )
}

export default GetRecipe;