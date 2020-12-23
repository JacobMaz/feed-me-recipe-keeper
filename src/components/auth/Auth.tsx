import React from 'react'
import {Link} from 'react-router-dom';

const Auth = () => {
    return (
        <div>
            <div>
                <Link to='/login'>LOG IN</Link>
                <Link to='/signup'>SIGN UP</Link>
            </div>
        </div>
    )
}

export default Auth;