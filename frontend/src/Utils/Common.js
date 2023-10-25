import axios from "axios";
import { API_ROUTES, APP_ROUTES } from "./Constans";

export function SaveTokenInLocalStorage(token)
{
    window.localStorage.setItem('Authorization', `Bearer ${token}`)
}

export function GetTokenFromLocalStorage()
{
    return window.localStorage.getItem('Authorization')
}


export async function GetInfoIfUserIsAuthenticated()
{
    const defaultObject = { user: null }

    try{
        const token = GetTokenFromLocalStorage()


        
        if(!token)
        {
            return defaultObject
        }
        
        const response = await axios( {
            method: "get",
            url: API_ROUTES.GET_USER,
            headers: {
                Authorization: token
            }
        })
    
        return [response.data.info]?.map(user => ({
            id: user.userId,
            email: user.email,
            username: user.userName,
          }))

    }
    catch(err)
    {
        return err.response.status
    }



}