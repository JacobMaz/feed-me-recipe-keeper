import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { AppBar, Button, Toolbar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(() =>
    createStyles({
        logSignButtons: {
            display: 'flex',
            justifyContent: 'flex-end'
        },
        buttonsDiv: {
            backgroundColor: 'black',
        },
        button: {
            backgroundColor: 'gray',
            margin: '2px'
        }
    }),
);

const NavbBar = () => {
    const classes = useStyles();

    return (
        <AppBar position='fixed'>
            <Toolbar>
                <Grid container spacing={3}>
                    <Grid item xs></Grid>
                    <Grid item xs={6}></Grid>
                    <Grid item xs className={classes.logSignButtons}>
                        <div className={classes.buttonsDiv}>
                            <Button className={classes.button} >Login</Button>
                            <Button className={classes.button} >Sign In</Button>
                        </div>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default NavbBar;