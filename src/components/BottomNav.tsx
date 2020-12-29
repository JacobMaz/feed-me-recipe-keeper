import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import {AddCircleOutline} from '@material-ui/icons';
import {Link} from 'react-router-dom';

class BottomNav extends Component{
    state={
        value: 0
    }

    handleChange = (e: any, value: any)=>{
        this.setState({value});
    }

    render(){
        const {value} = this.state;

        return(
            <BottomNavigation value={value} onChange={this.handleChange}>
                <Link to='/createRecipe'>
                    <BottomNavigationAction label='Add Recipe' showLabel icon={<AddCircleOutline />} />
                </Link>
            </BottomNavigation>
        )
    }
}

export default BottomNav;