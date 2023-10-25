import axios from "axios";
import { useState } from "react";
import { API_ROUTES } from "../../Utils/Constans";


export async function AuthUser(values) {

  try {    

    const response = axios({ 
      method: "post",
      url: API_ROUTES.SIGN_IN,
      data: values
    })

    const {data} = await response


    return data;
    
  
} catch (error) {
  
    return error

  }

}


