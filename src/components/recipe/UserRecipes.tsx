import UserRecipesIndex from './UserRecipesIndex'
import Token from '../interface/TokenProp'
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
        userRecipesDiv: {
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

const UserRecipes = (props: Token) => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <div className={classes.userRecipesDiv}>
                <h1 className={classes.title}>My Recipes</h1>
                <UserRecipesIndex token={props.token}  />
            </div>
        </Container>
    )
}

export default UserRecipes;