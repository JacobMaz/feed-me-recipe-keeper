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
import UserRecipes from './recipe/UserRecipesIndex';

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
    token: string | null
}

const Main = (props: Props) => {
    const classes = useStyles();

    const bottomNavHandle = () => {
        return props.token === '' ? null : <BottomNav />
    }

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
                        <Route exact path='/userRecipes' render={()=>(<UserRecipes token={props.token} />)} />
                    </Switch>
                    <div className={classes.bottomNavDiv}>
                        {bottomNavHandle()}
                    </div>
                    </div>
                </Router>
            </React.Fragment>
    )
}

export default Main;