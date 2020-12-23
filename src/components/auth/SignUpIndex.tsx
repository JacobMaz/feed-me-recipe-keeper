import React, { Component } from 'react';
import { TextField, Button} from '@material-ui/core';

type SignUpState = {
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
}

export default class SignUpIndex extends Component<{}, SignUpState>{
    constructor(props: any) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
        }
    }

    setFirstName(e: any) {
        this.setState({
            firstName: (e)
        })
        // console.log('firstName', this.state.firstName)
    }

    setLastName(e: any) {
        this.setState({
            lastName: (e)
        })
        // console.log('lastName', this.state.lastName)
    }

    setUserName(e: any) {
        this.setState({
            userName: (e)
        })
        // console.log('userName', this.state.userName)
    }

    setEmail(e: any) {
        this.setState({
            email: (e)
        })
        // console.log('email', this.state.email)
    }

    setPassword(e: any) {
        this.setState({
            password: (e)
        })
        // console.log('password', this.state.password)
    }

    signUpUser(e: any) {
        e.preventDefault();
        fetch('http://localhost:3210/user/register', {
            method: 'POST',
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                userName: this.state.userName,
                email: this.state.email,
                password: this.state.password
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((response) => response.json())
            .then((data) => console.log(data))
    }

    render() {
        return (
            <div>
                <form onSubmit={(e)=>this.signUpUser(e)} >
                    <TextField id="outlined-basic" label="First Name" variant="outlined" onChange={(e)=>this.setFirstName(e.target.value)} />
                    <TextField id="outlined-basic" label="Last Name" variant="outlined"
                    onChange={(e)=>this.setLastName(e.target.value)} />
                    <TextField id="outlined-basic" label="Username" variant="outlined" onChange={(e)=>this.setUserName(e.target.value)} />
                    <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e)=>this.setEmail(e.target.value)} />
                    <TextField id="outlined-basic" label="Password" variant="outlined" onChange={(e)=>this.setPassword(e.target.value)} />
                    <Button type='submit' variant="contained">Register</Button>
                </form>
            </div>
        )
    }
}