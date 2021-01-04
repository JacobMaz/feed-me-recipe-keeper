import UserRecipesIndex from './UserRecipesIndex'

interface Props {
    token: string
}

const UserRecipes = (props: Props) => {

    return (
            <div>
                <UserRecipesIndex token={props.token}  />
            </div>
    )
}

export default UserRecipes;