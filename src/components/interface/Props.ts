
export default interface Props {
    updateToken:(newToken: string) =>void,
    clearToken:() => void,
    updateRole:(newRole: string) => void,
    clearRole:()=>void,
    token: string | null,
    role: string | null
}