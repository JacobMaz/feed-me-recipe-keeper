import React from 'react'
import {createStyles, makeStyles} from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavbBar from './Navbar';
import BottomNav from './BottomNav'

import SignUp from './auth/SignUp'
import Home from './Home';
import Login from './auth/Login';
import CreateRecipe from './recipe/CreateRecipe';

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

type Props = {
    updateToken(arg: string): void
}

const Main = (props: Props) => {
    const classes = useStyles();

    return (
            <React.Fragment>
                <Router>
                    <div className={classes.mainDiv}>
                     <NavbBar />
                    <Switch>
                        <Route exact path='/home' component={Home} />
                        <Route exact path='/signup' render={()=>(<SignUp updateToken={props.updateToken} />)} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/createRecipe' render={()=>(<CreateRecipe />)} />
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