import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import SignUpIndex from './SignUpIndex';
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

const SignUp = (props: UpdateToken) => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <div>
                <h1>SIGN UP</h1>
                <SignUpIndex updateToken={props.updateToken} />
            </div>
        </Container>
    )
}

export default SignUp;