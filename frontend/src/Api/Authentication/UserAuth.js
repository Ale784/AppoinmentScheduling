import axios from "axios";
import { useState } from "react";
import { API_ROUTES } from "../../Utils/Constans";


export async function AuthUser(values) {

  try {

    
    const response = await axios.post(API_ROUTES.SIGN_IN, values);
    
    const { data } =  response;

    return data;

  } catch (error) {

    throw error;

  }

}


