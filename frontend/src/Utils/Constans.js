const BASE_API_URL = 'https://localhost:7088'

export const API_ROUTES = {
    SIGN_UP: `${BASE_API_URL}/auth/register`,
    SIGN_IN: `${BASE_API_URL}/auth/login`,
    GET_USER: `${BASE_API_URL}/auth/user`,
  }
  
export const APP_ROUTES = {
    SIGN_UP: '/register',
    SIGN_IN: '/login',
    HOME: '/home',
  }