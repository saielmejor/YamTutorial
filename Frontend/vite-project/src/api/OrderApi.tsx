import { useAuth0 } from "@auth0/auth0-react"

export const useCreateCheckoutSession=()=>{ 
    const {getAccessTokenSilently}=useAuth0()
}