import React from 'react'
import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core';
import ClearToken from '../interface/ClearToken'

const Auth = (props: ClearToken) => {
    return (
        <div>
            <div>
                <Link to='/login'><Button>LOG IN</Button></Link>
                <Link to='/signup'><Button>SIGN UP</Button></Link>
                <Button onClick={props.clearToken}>LOG OUT</Button>
            </div>
        </div>
    )
}

export default Auth;