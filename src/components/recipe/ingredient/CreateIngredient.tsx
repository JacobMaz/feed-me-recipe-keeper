import React from 'react'
import CreateIngredientIndex from './CreateIngredientIndex';

interface Props {
    token: string | null
    recipe: any
}

const CreateIngredient = (props: Props) => {

    return (
            <div>
                <CreateIngredientIndex recipe={props.recipe} token={props.token} />
            </div>
    )
}

export default CreateIngredient;