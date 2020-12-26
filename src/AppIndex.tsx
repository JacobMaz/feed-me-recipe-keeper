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

    updateToken(newToken: string){
        // this.setState({
        //     token: newToken
        // })
        console.log(this.state.token)
    }

    render() {
        return (
            <div className='app'>
                <Main updateToken={this.updateToken} />
            </div>
        )
    }
}