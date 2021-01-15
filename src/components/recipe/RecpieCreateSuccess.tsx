import {Container} from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom';
import smallFeedMeLogo from '../../assets/smallfeedmelogo.png'

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
        successDiv: {
            display: 'flex',
                alignItems:'center',
                flexDirection:'column',
                justifyContent: 'space-evenly',
        },
        title: {
            color: '#FFAE6C',
        },
        p: {
            color: '#FFAE6C',
            fontSize: '20px'
        },
        feedMeLogo: {
            height: '4em',
            width:  '4em'
        },
    }),
);

const RecipeSuccess = () => {
    const classes = useStyles();
    
    return (
        <Container className={classes.container}>
            <div className={classes.successDiv}>
               <h1 className={classes.title}>Success!</h1>
               <p className={classes.p}>You successfully created a Recipe!</p>
               <Link to='/'><img src={smallFeedMeLogo} alt={'FM'} className={classes.feedMeLogo}/></Link>
            </div>
        </Container>
    )
}

export default RecipeSuccess;