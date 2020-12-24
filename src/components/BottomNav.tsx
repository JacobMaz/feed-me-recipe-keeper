import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import {AddCircleOutline} from '@material-ui/icons';



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
                <BottomNavigationAction label='Add Recipe' icon={<AddCircleOutline />} />
            </BottomNavigation>
        )
    }
}

// BottomNav.propTypes = {
//     classes: PropTypes.object.isRequired
// }

export default BottomNav;