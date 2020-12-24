import React, { Component } from 'react';
import Main from './components/Main';

type AppState = {
    token: string | undefined
}

export default class AppIndex extends Component<{}, AppState>{
    constructor(props: any){
        super(props)
        this.state = {
            token: undefined
        }
    }

    render() {
        return (
            <div className='app'>
                <Main />
            </div>
        )
    }
}