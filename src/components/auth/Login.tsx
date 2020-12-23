import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {Container} from '@material-ui/core';
import LoginIndex from './LoginIndex';

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

const Login =()=>{
    const classes = useStyles();

    return(
        <Container className={classes.container}>
            <div>
                <h1>LOG IN</h1>
                <LoginIndex />
            </div>
        </Container>
    )
}

export default Login;