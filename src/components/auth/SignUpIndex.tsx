import React, { Component } from 'react';
import { TextField, Button} from '@material-ui/core';
import UpdateToken from '../interface/UpdateTokenProp'

type SignUpState = {
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
}

export default class SignUpIndex extends Component<UpdateToken, SignUpState>{
    constructor(props: UpdateToken) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
        }
        // this.updateToken = this.props.updateToken.bind(this)
    }

    signUpUser(e: React.FormEvent<HTMLFormElement>) {
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
            .then((data) => {
                this.props.updateToken(data.token)
            //    console.log(data.token)
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={(e)=>this.signUpUser(e)} >
                    <TextField id="outlined-basic" label="First Name" variant="outlined" onChange={(e)=>this.setState({firstName: (e.target.value)})} />
                    <TextField id="outlined-basic" label="Last Name" variant="outlined" onChange={(e)=>this.setState({lastName: (e.target.value)})} />
                    <TextField id="outlined-basic" label="Username" variant="outlined" onChange={(e)=>this.setState({userName: (e.target.value)})} />
                    <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e)=>this.setState({email: (e.target.value)})} />
                    <TextField id="outlined-basic" label="Password" variant="outlined" onChange={(e)=>this.setState({password: (e.target.value)})} />
                    <Button type='submit' variant="contained">Register</Button>
                </form>
            </div>
        )
    }
}