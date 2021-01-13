import React, { Component } from 'react';
import { TextField, Button} from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import APIURL from '../../helpers/environment';
import { Home } from '@material-ui/icons';

interface SignUpState {
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
}

const styles =()=>
    createStyles({
        form: {
            display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
            height: '23em'
        },
        button: {
            backgroundColor: '#FFAE6C',
            width: '10em',
            color: '#000A29',
            '&:hover': {
                backgroundColor: '#DF6400',
              },
            },
        input: {
            backgroundColor: '#FFAE6C',
            borderRadius: '6px',
            "& label.Mui-focused": {
              color: "#000A29",
            },
            "& .MuiInput-underline:after": {
              color: '#000A29'
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#000A29",
                color: '#000A29'
              },
              "&:hover fieldset": {
                borderColor: "#D76100",
                color: '#000A29'
              },
              "&.Mui-focused fieldset": {
                borderColor: "#FFE500",
                color: '#000A29'
              }
            }
          }
    })

interface UpdateToken extends WithStyles<typeof styles> {
        updateToken: (newToken: string) => void
    }

class SignUpIndex extends Component<UpdateToken, SignUpState>{
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
        fetch(`${APIURL}/user/register`, {
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
        const{classes} = this.props
        return (
            <div>
                <form onSubmit={(e)=>this.signUpUser(e)}  className={classes.form} >
                    <TextField required className={classes.input} id="outlined-basic" label="First Name" variant="outlined" onChange={(e)=>this.setState({firstName: (e.target.value)})} />
                    <TextField required className={classes.input} id="outlined-basic" label="Last Name" variant="outlined" onChange={(e)=>this.setState({lastName: (e.target.value)})} />
                    <TextField required className={classes.input} id="outlined-basic" label="Username" variant="outlined" onChange={(e)=>this.setState({userName: (e.target.value)})} />
                    <TextField required className={classes.input} type='email' id="outlined-basic" label="Email" variant="outlined" onChange={(e)=>this.setState({email: (e.target.value)})} />
                    <TextField required className={classes.input} type='password' id="outlined-basic" label="Password" variant="outlined" onChange={(e)=>this.setState({password: (e.target.value)})} />
                    <Button className={classes.button} type='submit' variant="contained">Register</Button>
                </form>
            </div>
        )
    }
}

export default withStyles(styles)(SignUpIndex)