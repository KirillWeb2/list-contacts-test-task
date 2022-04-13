import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IGetUser, IUser } from '../models/UsersModels'


export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/users' }),
    tagTypes: ['Users'],
    endpoints: (build) => ({
        getUser: build.query<IUser, IGetUser>({
            query: (data) => ({
                url: `/email=${data.email}`,
            }),
            providesTags: (result) => ['Users'],
        }),
        addUser: build.mutation<IUser[], IUser>({
            query: (data) => ({
                url: `/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Users'],
        })
    }),
})