import React from 'react'
import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core';
import ClearToken from '../interface/ClearToken'
import './Auth.css'

const Auth = (props: ClearToken) => {

    const authToggle =()=>{
        return localStorage.getItem('token') === null ?
            <div>
            <Link className={'link'} to='/login'><Button id={'button'}>LOG IN</Button></Link>
            <Link className={'link'} to='/signup'><Button id={'button'}>SIGN UP</Button></Link>
            </div>
                : <div className={'auth'}>
                <Link className={'link'} to='/'><Button id={'button'} onClick={props.clearToken}>LOG OUT</Button></Link>
                </div>
    }
    
    return (
            // <div className={'auth'}>
            //     <Link className={'link'} to='/login'><Button id={'button'}>LOG IN</Button></Link>
            //     <Link className={'link'} to='/signup'><Button id={'button'}>SIGN UP</Button></Link>
            //     <Link className={'link'} to='/'><Button id={'button'} onClick={props.clearToken}>LOG OUT</Button></Link>
            // </div>
            <div className={'auth'}>
                {authToggle()}
            </div>
    )      
}

export default Auth;