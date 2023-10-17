import { useEffect, useState } from "react";
import { GetInfoIfUserIsAuthenticated } from "../Utils/Common";


export function UseUser()
{
    const [user, setUser] = useState()


    useEffect(() => {

        async function UserDetails()
        {
 
            const user = await GetInfoIfUserIsAuthenticated();
            setUser(user)
                
        }

        UserDetails();

    }, [])

    return { userinfo: user }

}