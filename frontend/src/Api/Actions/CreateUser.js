import axios from "axios"
import { API_ROUTES } from "../../Utils/Constans"


export async function CreateUser(values)
{

    const response = axios({ 
        method: "post",
        url: API_ROUTES.SIGN_UP,
        headers: { "Content-Type": "application/json" },
        data: values
    })
    
    const data = await response

    return { mss: "User created successfully", data: data}
}