import React, { Component } from 'react'
import APIURL from '../../../helpers/environment';

type EditIngredientState = {
    name: string
    quantity: number
    measurement: string;
    ingredientType: string
}

interface Props {
    ingredient: Ingredient
    token: string | null
}

interface Ingredient {
    id: number;
    name: string;
    quantity: number;
    measurement: string;
    ingredientType: string;
    createdAt: string;
    updatedAt: string;
    recipeId: number;
    userId: number;
  }

class EditIngredient extends Component<Props, EditIngredientState>{
    constructor(props: Props){
        super(props);
        this.state = {
            name: this.props.ingredient.name,
            quantity: this.props.ingredient.quantity,
            measurement: this.props.ingredient.measurement,
            ingredientType: this.props.ingredient.measurement
        }
    }

    editRecipe(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        fetch(`${APIURL}/ingredient/${this.props.ingredient.id}`, {
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

    setQuantity(e: any) {
        this.setState({
          quantity: e,
        });
      }
    
    render(){
        return(
            <div>
                <form onSubmit={(e)=>this.editRecipe(e)}>
                    <input placeholder={this.props.ingredient.name} onChange={(e)=>this.setState({name: e.target.value})} />
                    <input type='number' onChange={(e)=>this.setQuantity(e)} />
                    <input placeholder={this.props.ingredient.measurement} onChange={(e)=>this.setState({measurement: e.target.value})} />
                    <select placeholder={this.props.ingredient.ingredientType} >
                        <option value='Main'>Main</option>
                        <option value='Produce'>Produce</option>
                        <option value='Sauces'>Sauces</option>
                        <option value='Sugar and Spices'>Sugar and Spices</option>
                        <option value='Baking'>Baking</option>
                    </select>
                    <button type='submit'>edit</button>
                </form>
            </div>
        )
    }
}

export default EditIngredient