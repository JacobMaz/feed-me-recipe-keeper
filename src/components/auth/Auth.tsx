import React from 'react'
import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core';

const Auth = () => {
    return (
        <div>
            <div>
                <Link to='/login'><Button>LOG IN</Button></Link>
                <Link to='/signup'><Button>SIGN UP</Button></Link>
            </div>
        </div>
    )
}

export default Auth;