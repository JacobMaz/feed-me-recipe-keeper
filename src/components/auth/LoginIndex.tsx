import React, { Component } from 'react';
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import { TextField, Button } from '@material-ui/core';
import APIURL from '../../helpers/environment';
import {Redirect} from 'react-router-dom';

interface LoginState {
    userName: string,
    password: string
    redirect: string
}

const styles =()=>
    createStyles({
        form: {
            display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around',
            height: '15em'
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
    updateToken: (newToken: string) => void,
    updateRole: (newRole: string) => void
}

class LoginIndex extends Component<UpdateToken, LoginState>{
    constructor(props: UpdateToken){
        super(props)
        this.state ={
            userName: '',
            password: '',
            redirect: ''
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
                this.props.updateToken(data.token);
                this.props.updateRole(data.user.role)
                this.setState({
                    redirect: '/'
                })
            })
            .catch(err=>{
                console.log(err)
            })
    }

    render() {
        const{classes} = this.props
        if (this.state.redirect){
            return <Redirect to={this.state.redirect}/>
        }
        return (
            <div>
                <form onSubmit={(e)=>this.loginUser(e)} className={classes.form} >
                    <TextField required className={classes.input} id='filled-required' label="Username" variant="outlined" onChange={(e)=>this.setState({userName: (e.target.value)})} />
                    <TextField type='password' required className={classes.input} id="outlined-basic" label="Password" variant="outlined" onChange={(e)=>this.setState({password: (e.target.value)})} />
                     <Button className={classes.button} type='submit' variant='contained'>LOG IN</Button>
                </form>
            </div>
        )
    }
}

export default withStyles(styles)(LoginIndex)