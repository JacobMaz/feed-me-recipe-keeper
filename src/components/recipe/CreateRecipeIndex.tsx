import React, { Component } from 'react'
import {TextField, Button} from '@material-ui/core';

type RecipeState = {
    recipeName: string,
    cuisine: string,
    prepTime: number | null,
    cookTime: number | null,
    directions: string
}

export default class CreateRecipeIndex extends Component<{}, RecipeState>{
    constructor(props: any){
        super(props)
        this.state ={
            recipeName: '',
            cuisine: '',
            prepTime: null,
            cookTime: null,
            directions: '',
        }
    }

    setRecipeName(e: any){
        this.setState({
            recipeName:(e)
        })
    }

    setCuisine(e: any){
        this.setState({
            cuisine:(e)
        })
    }

    setPrepTime(e: any){
        this.setState({
            prepTime:(e)
        })
    }

    setCookTime(e: any){
        this.setState({
            cookTime:(e)
        })
    }

    setDirections(e: any){
        this.setState({
            directions:(e)
        })
    }

    createRecipe(e: any){
        e.preventDefault();
        fetch('http://localhost:3210/recipe/create', {
            method: 'POST',
            body: JSON.stringify({
                recipeName: this.state.recipeName,
                cuisine: this.state.cuisine,
                prepTime: this.state.prepTime,
                cookTime: this.state.cookTime,
                directions: this.state.directions
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((response)=> response.json())
            .then((data)=>{
                console.log(data)
            })
    }

    render(){
        return (
            <div>
                <form>
                <TextField id="outlined-basic" label="Recipe Name" variant="outlined" onChange={(e)=>this.setRecipeName(e.target.value)} />
                <TextField id="outlined-basic" label="Cuisine" variant="outlined" onChange={(e)=>this.setCuisine(e.target.value)} />
                <TextField id="outlined-basic" label="Prep Time" variant="outlined" onChange={(e)=>this.setPrepTime(e.target.value)} />
                <TextField id="outlined-basic" label="Cook Time" variant="outlined" onChange={(e)=>this.setCookTime(e.target.value)} />
                <TextField id="outlined-basic" label="Directions" variant="outlined" onChange={(e)=>this.setDirections(e.target.value)} />
                <Button type='submit' variant='contained'>Add Recipe</Button>
                </form>
            </div>
        )
    }
}