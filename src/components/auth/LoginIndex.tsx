import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import UpdateToken from '../interface/UpdateTokenProp'
import APIURL from '../../helpers/environment';

type LoginState = {
    userName: string,
    password: string
}

export default class LoginIndex extends Component<UpdateToken, LoginState>{
    constructor(props: UpdateToken){
        super(props)
        this.state ={
            userName: '',
            password: ''
        }
    }

    loginUser(e: React.FormEvent<HTMLFormElement> ){
        e.preventDefault();
        fetch(`${APIURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({
                userName: this.state.userName,
                password: this.state.password
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response=> response.json())
            .then(data=> {
                this.props.updateToken(data.token)
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={(e)=>this.loginUser(e)} >
                    <TextField id="outlined-basic" label="Username" variant="outlined" onChange={(e)=>this.setState({userName: (e.target.value)})} />
                    <TextField id="outlined-basic" label="Password" variant="outlined" onChange={(e)=>this.setState({password: (e.target.value)})} />
                    <Button type='submit' variant='contained'>LOG IN</Button>
                </form>
            </div>
        )
    }
}