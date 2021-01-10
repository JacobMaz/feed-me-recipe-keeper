import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {Container} from '@material-ui/core';
import LoginIndex from './LoginIndex';
import UpdateToken from '../interface/UpdateTokenProp'

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            marginTop: '5em',
            backgroundColor: 'gray',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            height: '100%'
        }
    }),
);

const Login =(props: UpdateToken)=>{
    const classes = useStyles();

    return(
        <Container className={classes.container}>
            <div>
                <h1>LOG IN</h1>
                <LoginIndex updateToken={props.updateToken} />
            </div>
        </Container>
    )
}

export default Login;