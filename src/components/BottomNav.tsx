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
            <BottomNavigation value={value} onChange={this.handleChange} showLabels >
                <Link to='/createRecipe'>
                    <BottomNavigationAction label='Add Recipe' icon={<AddCircleOutline />} showLabel />
                </Link>
            </BottomNavigation>
        )
    }
}

// BottomNav.propTypes = {
//     classes: PropTypes.object.isRequired
// }

export default BottomNav;