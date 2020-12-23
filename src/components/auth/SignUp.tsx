import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import SignUpIndex from './SignUpIndex';

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

const SignUp = () => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <div>
                <h1>Sign Up</h1>
                <SignUpIndex />
            </div>
        </Container>
    )
}

export default SignUp;