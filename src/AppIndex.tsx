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
        }
    }

    updateToken = (newToken: string)=> {
        localStorage.setItem('token', newToken)
        this.setState({
            token: newToken
        })
        console.log('tokenState: ', this.state.token)
        console.log('Local Storage Token: ', localStorage.getItem('token'))
    }

    clearToken = ()=> {
        localStorage.clear();
        this.setState({
            token: ''
        })
        console.log('token cleared: ', this.state.token)
    }

    componentDidMount(){
        return <Home />
    }

    render() {
        return (
            <div>
                <Main updateToken={this.updateToken} token={this.state.token} clearToken={this.clearToken} />
            </div>
        )
    }
}