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
import Admin from './recipe/Admin';

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
                     <NavbBar token={props.token} role={props.role} clearToken={props.clearToken} clearRole={props.clearRole} />
                    <Switch>
                        <div className={classes.mainDiv}>
                            <div>
                                <Route exact path='/admin' render={()=>(<Admin token={props.token} role={props.role} />)} />
                                <Route exact path='/' render={()=>(<Home />)} />
                                <Route exact path='/signup' render={()=>(<SignUp updateRole={props.updateRole} updateToken={props.updateToken} />)} />
                                <Route exact path='/login' render={()=>(<Login updateRole={props.updateRole} updateToken={props.updateToken} />)} />
                                <Route exact path='/createRecipe' render={()=>(<CreateRecipe role={props.role} token={props.token} />)} />
                                <Route exact path='/getRecipe' render={()=>(<GetRecipe role={props.role} />)} />
                                <Route exact path='/userRecipes' render={()=>(<UserRecipes role={props.role} token={props.token} />)} />
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