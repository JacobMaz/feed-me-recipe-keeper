import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Auth from './auth/Auth';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() =>
    createStyles({
        logSignButtons: {
            display: 'flex',
            justifyContent: 'flex-end'
        },
    }),
);

interface Props {
    clearToken:() => void
}

const NavbBar = (props: Props) => {
    const classes = useStyles();

    return (
        <AppBar position='fixed'>
            <Toolbar>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <Link to='home'>Home</Link>
                    </Grid>
                    <Grid item xs={6}></Grid>
                    <Grid item xs className={classes.logSignButtons}>
                        <Auth clearToken={props.clearToken} />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default NavbBar;