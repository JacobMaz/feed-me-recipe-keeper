import React, { Component } from 'react';
import GetRecipe from './GetRecipe';

type GetRecipeState = {
    recipeResponse: any
}

export default class GetRecipeIndex extends Component<{}, GetRecipeState>{
    constructor(props: any) {
        super(props)
        this.state = {
            recipeResponse: []
        }
    }

    allRecipes(){
        fetch('http://localhost:3210/recipe/allrecipes', {
            method: 'GET',
        })
        .then((res) => res.json())
        .then(data =>{
            this.setState({
                recipeResponse: data.allRecipe
            })
            console.log('response', data.allRecipe)
        })
    }

    componentDidMount(){
        this.allRecipes()
    }

    render(){
        return(
            <div>
                <GetRecipe recipeResponse={this.state.recipeResponse} />
            </div>
        )
    }
}