import React, { Component } from 'react';
import Main from './components/Main';
import Props from './components/interface/Props'
import Token from './components/interface/TokenProp'
import Home from './components/Home';

export default class AppIndex extends Component<{}, Token>{
    constructor(props: Props){
        super(props)
        this.state = {
            token: localStorage.getItem('token') ? localStorage.getItem('token') : '' ,
            role: localStorage.getItem('role') ? localStorage.getItem('role') : ''
        }
    }

    updateToken = (newToken: string)=> {
        localStorage.setItem('token', newToken);
        this.setState({
            token: newToken
        })
        console.log('tokenState: ', this.state.token)
        console.log('Local Storage Token: ', localStorage.getItem('token'))
    }

    updateRole = (newRole: string)=>{
        localStorage.setItem('role', newRole);
        this.setState({
            role: newRole
        })
        console.log('Local Storage Role', localStorage.getItem('role'))
    }

    clearToken = ()=> {
        localStorage.clear();
        this.setState({
            token: '',
            role: ''
        })
        console.log('token cleared: ', this.state.token)
    }

    clearRole =()=> {
        this.setState({
            role: ''
        })
    }

    // componentDidMount(){
    //     // return <Home />
    // }

    render() {
        return (
            <div>
                <Main role={this.state.role} clearRole={this.clearRole} updateRole={this.updateRole} updateToken={this.updateToken} token={this.state.token} clearToken={this.clearToken} />
            </div>
        )
    }
}