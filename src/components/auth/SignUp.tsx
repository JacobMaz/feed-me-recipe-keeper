import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import SignUpIndex from './SignUpIndex';
import UpdateToken from '../interface/UpdateTokenProp'

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            background: 'rgba(50, 50, 50, 0.5)',
            display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
            height: '70vh',
            width: '50vw',
            border: '5px solid #FFAE6C',
            borderRadius: '5px',
            overflow: 'auto'
        },
        singUpDiv: {
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

const SignUp = (props: UpdateToken) => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <div className={classes.singUpDiv}>
                <h1 className={classes.title}>SIGN UP</h1>
                <SignUpIndex updateToken={props.updateToken} />
            </div>
        </Container>
    )
}

export default SignUp;