import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../models/UsersModels';

interface IUserReducer {
    user: IUser
    isAuthUser: boolean
}

const initialState: IUserReducer = {
    user: {} as IUser,
    isAuthUser: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload
        },
        getIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuthUser = action.payload
        },
    },
    extraReducers: {},
})

export default userSlice.reducer