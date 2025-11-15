import React, { createContext, useCallback, useEffect, useState } from 'react'
import axios from 'axios'


export const AuthContext = createContext({})


export function AuthProvider({ children }) {
const [isLogged, setIsLogged] = useState(false)
const [checking, setChecking] = useState(true)


const login = useCallback(() => {
window.location.href = 'http://localhost:3001/auth/login'
}, [])


const logout = useCallback(async () => {
try {
await axios.get('http://localhost:3001/auth/logout', { withCredentials: true })
setIsLogged(false)
} catch (e) {
console.error('logout failed', e)
}
}, [])


const reload = useCallback(async () => {
setChecking(true)
try {
const r = await axios.get('http://localhost:3001/auth/status', { withCredentials: true })
setIsLogged(Boolean(r.data.authenticated))
} catch (e) {
setIsLogged(false)
} finally {
setChecking(false)
}
}, [])


useEffect(() => { reload() }, [reload])


return (
<AuthContext.Provider value={{ isLogged, checking, login, logout, reload }}>
{children}
</AuthContext.Provider>
)
}