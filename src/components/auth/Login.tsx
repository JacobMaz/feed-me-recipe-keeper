import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {Container} from '@material-ui/core';
import LoginIndex from './LoginIndex';
import UpdateToken from '../interface/UpdateTokenProp'

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            background: 'rgba(50, 50, 50, 0.5)',
            display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
            height: '50vh',
            width: '50vw',
            border: '5px solid #FFAE6C',
            borderRadius: '5px',
            overflow: 'auto'
        },
        loginDiv: {
            display: 'flex',
                alignItems:'center',
                flexDirection:'column'
        },
        title: {
            color: '#FFAE6C',
            marginTop: '3'
        }
    }),
);

const Login =(props: UpdateToken)=>{
    const classes = useStyles();

    return(
        <Container className={classes.container}>
            <div className={classes.loginDiv}>
                <h1 className={classes.title}>LOG IN</h1>
                <LoginIndex updateToken={props.updateToken} />
            </div>
        </Container>
    )
}

export default Login;