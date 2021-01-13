import React, { Component } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { BottomNavigation, BottomNavigationAction, withStyles, WithStyles } from '@material-ui/core';
import { AddCircleOutline, MenuBook, Person } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const styles =() =>
    createStyles({
        bottomNav: {
            backgroundColor: '#000A29',
        },
        icon: {
            color: '#FFAE6C'
        },
        link: {
            textDecoration: 'none'
        }
    })

interface Props extends WithStyles<typeof styles>{
    token: string | null
}

class BottomNav extends Component<Props, {}> {
    constructor(props: Props){
        super(props)
    }
    

    render() {
        const{classes} = this.props

        return (
            <BottomNavigation className={classes.bottomNav}>
                <Link className={classes.link} to='/createRecipe'>
                    <BottomNavigationAction className={classes.icon} label='Add Recipe' showLabel icon={<AddCircleOutline className={classes.icon} />} />
                </Link>
                <Link className={classes.link} to='/getRecipe'>
                    <BottomNavigationAction className={classes.icon} label='View Recipes' showLabel icon={<MenuBook className={classes.icon} />} />
                </Link>
                <Link className={classes.link} to='/userRecipes'>
                    <BottomNavigationAction className={classes.icon} label='My Recipes' showLabel icon={<Person className={classes.icon} />} />
                </Link>
            </BottomNavigation>
        )
    }
}

export default withStyles(styles)(BottomNav);