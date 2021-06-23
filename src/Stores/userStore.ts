import create from 'zustand'
import jwt from "jsonwebtoken"

interface UserState {
  token:string | null,
  payload: {
    id: string
    firstName: string
    lastName: string
    department: string
    exp:number
  } | null, 
  setToken:(token:string) => void,
}

const useUserStore = create<UserState>(set => ({
  token: null,
  payload: null,
  setToken: (token) => set(state => {
      state.token = token
      state.payload = jwt.decode(token) as UserState["payload"]
  }),
}))

export default useUserStore