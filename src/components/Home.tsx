import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Container, Button } from '@material-ui/core'
import { Link } from 'react-router-dom';
import feedMeLogo from '../assets/feedmelogo.png'

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            // marginTop: '5em',
            background: 'rgba(50, 50, 50, 0.5)',
            display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
            height: '50vh',
            width: '50vw',
            border: '5px solid #FFAE6C',
            borderRadius: '5px'
        },
        homeDiv: {
            display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
        },
        link: {
            textDecoration: 'none'
        },
        button: {
            backgroundColor: '#FFAE6C',
            color: '#000A29',
            '&:hover': {
                backgroundColor: '#DF6400',
              },
            },
    }),
);

const Home = () => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <div className={classes.homeDiv}>
                <div>
                    <img src={feedMeLogo} alt={'Feed Me: Recipe Keeper'} />
                </div>
                <div>
                    <Link to='/getRecipe' className={classes.link}>
                        <Button className={classes.button}>All Recipes</Button>
                    </Link>
                </div>
            </div>
        </Container>
    )
}

export default Home;