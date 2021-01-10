import UserRecipesIndex from './UserRecipesIndex'
import Token from '../interface/TokenProp'

const UserRecipes = (props: Token) => {

    return (
            <div>
                <UserRecipesIndex token={props.token}  />
            </div>
    )
}

export default UserRecipes;