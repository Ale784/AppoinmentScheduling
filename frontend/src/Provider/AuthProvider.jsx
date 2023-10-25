import axios from "axios";
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react";
import { GetInfoIfUserIsAuthenticated, GetTokenFromLocalStorage, SaveTokenInLocalStorage } from "../Utils/Common";

  const AuthContext = createContext();

  function AuthProvider({children})
  {
    const tokenFromLocalStorage = GetTokenFromLocalStorage();
    const [token, setToken] = useState(tokenFromLocalStorage);

    const storeToken = (token) => {
        if(token != tokenFromLocalStorage)
        {
          setToken(token)
          SaveTokenInLocalStorage(token)
        }
    }


    useEffect(() => {

      const validateToken = async() => {
          
          if(token)
          {
             const isUserAuthenticate = await GetInfoIfUserIsAuthenticated();

             if(isUserAuthenticate != 401)
             {
                axios.defaults.headers.common["Authorization"] = "Bearer " + token;
             } else{
                  // Remove the token from state and local storage
                  setToken(null);
                  SaveTokenInLocalStorage(null);
             }

          } 
          
          else{
            delete axios.defaults.headers.common["Authorization"];
          }

  
        }

        validateToken();

    }, [token])


    const contextValue = useMemo(() => ({
        token,
        storeToken
    }), [token])


    return(
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    )
  }

  export const useAuth = () => {
    return useContext(AuthContext);
  };
  
  export default AuthProvider;