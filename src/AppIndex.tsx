import React, { Component } from 'react';
import Main from './components/Main';

type AppState = {
    token: string
}

export default class AppIndex extends Component<{}, AppState>{
    constructor(props: any){
        super(props)
        this.state = {
            token: ''
        }
    }

    componentDidMount(){
        console.log('componentDidMount: ', this.state.token)
    }

    updateToken = (newToken: string)=> {
        localStorage.setItem('token', newToken)
        this.setState({
            token: newToken
        })
        console.log('tokenState: ', this.state.token)
        console.log(localStorage.getItem('token'))
    }

    render() {
        return (
            <div className='app'>
                <Main updateToken={this.updateToken} />
            </div>
        )
    }
}