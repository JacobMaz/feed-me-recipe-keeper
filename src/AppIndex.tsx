import React, { Component } from 'react';
import Main from './components/Main';

type AppState = {
    token: string
    recipeRes: any
}

export default class AppIndex extends Component<{}, AppState>{
    constructor(props: any){
        super(props)
        this.state = {
            token: '',
            recipeRes: []
        }
    }

    // componentDidMount(){
    //     console.log('componentDidMount: ', this.state.token)
    // }

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

    render() {
        return (
            <div className='app'>
                <Main updateToken={this.updateToken} token={this.state.token} clearToken={this.clearToken} />
            </div>
        )
    }
}