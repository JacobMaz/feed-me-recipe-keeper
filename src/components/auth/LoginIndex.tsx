import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';

type LoginState = {
    userName: string,
    password: string
}

export default class LoginIndex extends Component<{}, LoginState>{
    constructor(props: any){
        super(props)
        this.state ={
            userName: '',
            password: ''
        }
    }

    setUserName(e:any){
        this.setState({
            userName: (e)
        })
    }

    setPassword(e: any){
        this.setState({
            password: (e)
        })
    }

    loginUser(e: any){
        e.preventDefault();
        fetch('http://localhost:3210/user/login', {
            method: 'POST',
            body: JSON.stringify({
                userName: this.state.userName,
                password: this.state.password
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((response)=> response.json())
            .then((data)=> console.log(data))
    }

    render() {
        return (
            <div>
                <form onSubmit={(e)=>this.loginUser(e)} >
                    <TextField id="outlined-basic" label="Username" variant="outlined" onChange={(e)=>this.setUserName(e.target.value)} />
                    <TextField id="outlined-basic" label="Password" variant="outlined" onChange={(e)=>this.setPassword(e.target.value)} />
                    <Button type='submit' variant='contained'>LOG IN</Button>
                </form>
            </div>
        )
    }
}