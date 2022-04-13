import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { IUser } from "../models/UsersModels"
import { userSlice } from "../store/slices/UserSlice"
import { useAppDispatch } from "./ReduxHooks"

export const storageName: string = 'authData'

export const useAuthHook = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false)
    const [isAuth, setIsAuth] = useState<boolean>(false)

    const { getIsAuth, getUser } = userSlice.actions

    const login = useCallback((user: IUser) => {
        localStorage.setItem(
            storageName,
            JSON.stringify({
                id: user.id,
                email: user.email
            })
        )

        dispatch(getIsAuth(true))
        setIsLoadingAuth(false)
    }, [])

    const logout = useCallback(() => {
        setIsAuth(false)

        localStorage.removeItem(storageName)

        dispatch(getIsAuth(false))
        setIsLoadingAuth(false)
    }, [])


    useEffect(() => {
        let data: IUser | null = null

        const userJson = localStorage.getItem(storageName)

        if (userJson !== null) {
            data = JSON.parse(userJson)
        }

        if (data && data.email) {
            const getUserById = async () => {
                try {
                    await axios.get<IUser[]>(`http://localhost:3030/users?id=${data?.id}`).then(res => {
                        if (res.data[0] && res.data[0].id) {
                            dispatch(getIsAuth(true))
                            dispatch(getUser(res.data[0]))

                            setIsAuth(true)
                            setIsLoadingAuth(false)
                        }
                    })

                    navigate('/contacts')
                } catch (e) {
                    console.log(e)
                }
            }
            getUserById()
        }

        setIsLoadingAuth(false)
    }, [login])


    return {
        login,
        logout,
        isAuth,
        isLoadingAuth
    }
}