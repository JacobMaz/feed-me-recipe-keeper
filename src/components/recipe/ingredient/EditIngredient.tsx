import React, { Component } from 'react'

type EditIngredientState = {
    name: string
}

interface Props {
    ingredient: any
    token: string | null
}

class EditIngredient extends Component<Props, EditIngredientState>{
    constructor(props: any){
        super(props);
        this.state = {
            name: this.props.ingredient.name
        }
    }

    editRecipe(e: any){
        e.preventDefault();
        fetch(`http://localhost:3210/ingredient/${this.props.ingredient.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: this.state.name
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.token}`
            })
        }).then((res)=>res.json())
          .then((updatedIngredient)=>{
              console.log(updatedIngredient)
          })
    }
    
    render(){
        return(
            <div>
                <form onSubmit={(e)=>this.editRecipe(e)}>
                    <input placeholder={this.props.ingredient.name} onChange={(e)=>this.setState({name: e.target.value})} />
                    <input placeholder={this.props.ingredient.quantity} />
                    <input placeholder={this.props.ingredient.measurement} />
                    <button type='submit'>edit</button>
                </form>
            </div>
        )
    }
}

export default EditIngredient