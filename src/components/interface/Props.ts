
export default interface Props {
    updateToken:(newToken: string) =>void,
    clearToken:() => void,
    token: string | null
}