import { Alert, Button, Input, notification } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/ReduxHooks'
import { useAuthHook } from '../../hooks/useAuthHook'
import { IForma, IUser } from '../../models/UsersModels'
import { authAPI } from '../../services/AuthService'
import { userSlice } from '../../store/slices/UserSlice'
import s from './Login.module.scss'

const Login = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    const [forma, setForma] = useState<IForma>({
        email: '',
        password: ''
    })

    const [error, setError] = useState<string>('')

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case "email":
                setForma({ ...forma, email: e.target.value })
                break;
            case "password":
                setForma({ ...forma, password: e.target.value })
                break;
            default: return
        }
    }


    const { login } = useAuthHook()
    const { getUser, getIsAuth } = userSlice.actions
    const [addUser, { }] = authAPI.useAddUserMutation()

    const send = async () => {
        try {
            await axios.get<IUser[]>(`http://localhost:3030/users`).then(res => {
                const user = res.data.find((i: IUser) => i.email === forma.email)

                if (user && user.email) {
                    dispatch(getUser(user))
                    dispatch(getIsAuth(true))

                    login(user)
                } else {
                    const newUser = { ...forma, id: res.data.length + 1 }

                    addUser(newUser)

                    dispatch(getIsAuth(true))
                    dispatch(getUser(newUser))

                    login(newUser)
                }
                notification['success']({
                    message: 'Успешно',
                    description: 'Вы вошли',
                })

                navigate('/contacts')
            })

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={s.centered}>
            <div className={s.login}>
                <h1>Login</h1>
                <div className={s.login__inputs}>
                    <Input
                        name="email"
                        type={"email"}
                        value={forma.email}
                        onChange={change}
                    />
                    <Input
                        name="password"
                        type={"password"}
                        value={forma.password}
                        onChange={change}
                    />
                </div>
                <div>

                    <Button
                        onClick={send}
                    >
                        Кнопка
                    </Button>
                </div>
                {!!error && <Alert message={error} />}
            </div>
        </div>
    )
}

export default Login