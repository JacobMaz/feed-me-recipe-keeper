import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Auth from './auth/Auth';
import { Link } from 'react-router-dom';
import ClearToken from './interface/ClearToken'
import smallFeedMeLogo from '../assets/smallfeedmelogo.png'

const useStyles = makeStyles(() =>
    createStyles({
        logSignButtons: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
        appBar: {
            backgroundColor: '#000A29',
        },
        feedMeLogo: {
            height: '2.2em',
            width:  '2.2em'
        },
        title: {
            display: 'flex',
            justifyContent: 'center',
            color: '#FFAE6C'
        },
        logo: {
            display: 'flex',
            alignItems: 'center'
        }
    }),
);

const NavbBar = (props: ClearToken) => {
    const classes = useStyles();

    return (
        <AppBar position='fixed' className={classes.appBar} >
            <Toolbar>
                <Grid container spacing={3}>
                    <Grid item xs className={classes.logo}>
                        <Link to='/'><img src={smallFeedMeLogo} className={classes.feedMeLogo}/></Link>
                    </Grid>
                    <Grid item xs={6} className={classes.title}>
                        <h2>Feed Me: Recipe Keeper</h2>
                    </Grid>
                    <Grid item xs className={classes.logSignButtons}>
                        <Auth clearToken={props.clearToken} />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default NavbBar;