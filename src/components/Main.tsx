import React from 'react'
import SignUp from './auth/SignUp'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavbBar from './Navbar';
import Home from './Home';

const Main = () => {
        return (
            <React.Fragment>
                <Router>
                    <NavbBar />
                    <Switch>
                        <Route exaft path='/home' component={Home} />
                        <Route exact path='/signup' component={SignUp} />
                    </Switch>
                </Router>
            </React.Fragment>
        )
}

export default Main;