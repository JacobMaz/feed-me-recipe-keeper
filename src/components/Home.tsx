import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Container, Button } from '@material-ui/core'

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            marginTop: '5em',
            backgroundColor: 'gray',
            display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
        }
    }),
);

const Home = () => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <div>
                <h1>HOME</h1>
                <Button>All Recipes</Button>
            </div>
        </Container>
    )
}

export default Home;