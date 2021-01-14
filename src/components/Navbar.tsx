import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Auth from './auth/Auth';
import { Link } from 'react-router-dom';
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
        },
        admin: {
            textDecoration: 'none',
            color: '#FFAE6C',
            marginLeft: '1em'
        }
    }),
);


interface ClearToken {
    clearToken:() => void,
    clearRole:()=> void,
    role: string | null,
    token: string | null,
}

const NavbBar = (props: ClearToken) => {
    const classes = useStyles();

    const admin =()=>{
        return props.role === 'admin' ? <Link className={classes.admin} to='/admin'>Admin</Link> : null
    }

    return (
        <AppBar position='fixed' className={classes.appBar} >
            <Toolbar>
                <Grid container spacing={3}>
                    <Grid item xs className={classes.logo}>
                        <Link to='/'><img src={smallFeedMeLogo} className={classes.feedMeLogo}/></Link>
                        {admin()}
                    </Grid>
                    <Grid item xs={6} className={classes.title}>
                        <h2>Feed Me: Recipe Keeper</h2>
                    </Grid>
                    <Grid item xs className={classes.logSignButtons}>
                        <Auth clearRole={props.clearRole} clearToken={props.clearToken} />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default NavbBar;