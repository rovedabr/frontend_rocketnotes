import { createContext, useContext } from "react";

import { api } from "../services/api";

export const AuthContext = createContext({})

function AuthProvider({ children }) {
  async function sigIn({ email, password }) {

    try {
      const response = await api.post("/sessions", { email, password })
      console.log(response)
    } catch (error){
      if(error.message) {
        alert(error.response.data.message)
      } else {
        alert("Não foi possível entrar")
      }
    }
  }


  return (
    <AuthContext.Provider value={{ name:"ivan", email:"rovedabr@gmail.com" }} >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }