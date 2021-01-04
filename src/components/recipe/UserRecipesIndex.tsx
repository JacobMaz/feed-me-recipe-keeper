import React, { Component } from 'react';
import UserRecipes from './UserRecipes';

type UserRecipesState = {
    userRecipeState: any
}

interface Props {
    token: string
}

export default class UserRecipesIndex extends Component<Props, UserRecipesState>{
    constructor(props: any) {
        super(props)
        this.state = {
            userRecipeState: []
        }
    }

    userRecipes() {
        fetch('http://localhost:3210/recipe/userrecipes', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then((res) => res.json())
            .then(data => {
                this.setState({
                    userRecipeState: data.userRecipes
                })
                console.log('response', data.userRecipes)
            })
    }

    componentDidMount(){
        this.userRecipes()
    }

    deleteReceipe(recipe: any){
        fetch(`http://localhost:3210/recipe/${recipe.id}`, {
            method: 'DELETE',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.token
            })
        })
        .then(()=>console.log(this.userRecipes))
    }

    render() {
        return (
            <div>
                <UserRecipes userRecipes={this.state.userRecipeState} deleteRecipe={this.deleteReceipe} />
            </div>
        )
    }
}