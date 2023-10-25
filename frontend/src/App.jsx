import AuthProvider from "./Provider/AuthProvider";
import {  AppRoutes  } from "./Routes/indexRoutes"


function App() {

  return (
    <main className="font-josefin text-lg sm:text-sm">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </main>
  )
}

export default App
 