import React from 'react'
import {createStyles, makeStyles} from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavbBar from './Navbar';
import BottomNav from './BottomNav'

import SignUp from './auth/SignUp'
import Home from './Home';
import Login from './auth/Login';
import CreateRecipe from './recipe/CreateRecipe';
import GetRecipeIndex from './recipe/GetRecipeIndex';

const useStyles = makeStyles(()=>
    createStyles({
        mainDiv: {
            backgroundColor: 'black',
        },
        bottomNavDiv: {
            position: 'fixed',
            bottom: '0',
            width: '100%'
        }
    })
)

interface Props {
    updateToken:(newToken: string) =>void,
    clearToken:() => void,
    token: string
}

const Main = (props: Props) => {
    const classes = useStyles();

    return (
            <React.Fragment>
                <Router>
                    <div className={classes.mainDiv}>
                     <NavbBar clearToken={props.clearToken} />
                    <Switch>
                        <Route exact path='/home' render={()=>(<Home />)} />
                        <Route exact path='/signup' render={()=>(<SignUp updateToken={props.updateToken} />)} />
                        <Route exact path='/login' render={()=>(<Login updateToken={props.updateToken} />)} />
                        <Route exact path='/createRecipe' render={()=>(<CreateRecipe token={props.token} />)} />
                        <Route exact path='/getRecipe' render={()=>(<GetRecipeIndex />)} />
                    </Switch>
                    <div className={classes.bottomNavDiv}>
                        <BottomNav />
                    </div>
                    </div>
                </Router>
            </React.Fragment>
    )
}

export default Main;