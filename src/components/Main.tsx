import React from 'react'
import {createStyles, makeStyles} from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavbBar from './Navbar';
import BottomNav from './BottomNav'
import SignUp from './auth/SignUp'
import Home from './Home';
import Login from './auth/Login';
import CreateRecipe from './recipe/CreateRecipe';
import Props from './interface/Props'
import GetRecipe from './recipe/GetRecipe';
import UserRecipes from './recipe/UserRecipes';

const useStyles = makeStyles(()=>
    createStyles({
        mainDiv: {
            // backgroundColor: '#ffffe3',
            height: '100vh',
            display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
        },
        bottomNavDiv: {
            position: 'fixed',
            bottom: '0',
            width: '100%'
        }
    })
)

const Main = (props: Props) => {
    const classes = useStyles();

    const bottomNavHandle = () => {
        return props.token === '' || props.token === undefined ? null : <BottomNav token={props.token} />
    }

    return (
            <React.Fragment>
                <Router>
                     <NavbBar clearToken={props.clearToken} />
                    <Switch>
                        <div className={classes.mainDiv}>
                            <div>
                                <Route exact path='/' render={()=>(<Home />)} />
                                <Route exact path='/signup' render={()=>(<SignUp updateToken={props.updateToken} />)} />
                                <Route exact path='/login' render={()=>(<Login updateToken={props.updateToken} />)} />
                                <Route exact path='/createRecipe' render={()=>(<CreateRecipe token={props.token} />)} />
                                <Route exact path='/getRecipe' render={()=>(<GetRecipe />)} />
                                <Route exact path='/userRecipes' render={()=>(<UserRecipes token={props.token} />)} />
                            </div> 
                        </div>
                    </Switch>
                    <div className={classes.bottomNavDiv}>
                        {bottomNavHandle()}
                    </div>
                </Router>
            </React.Fragment>
    )
}

export default Main;