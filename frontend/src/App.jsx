 import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "./Pages/Login"
import { Register } from "./Pages/Register"
import { Home } from "./Pages/Home"
import { UseUser } from "./Services/UseUser";



function App() {
  const { userinfo = [] } = UseUser()

  console.log(userinfo)

  return (
    <main className="font-josefin text-lg sm:text-sm">
      <Routes>
        
        <Route path="/" element = {<Navigate replace to="/login" />} />
        <Route exact path="/home" element={<Home userinfo={userinfo} />}/>
        <Route exact path="/login" element={<Login /> }/>
        <Route exact path="/register" element={<Register />} />
        
      </Routes>
    </main>
  )
}

export default App
 