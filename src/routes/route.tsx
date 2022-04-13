import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { privatRoutes, localRoutes } from './index'


export const useRoutes = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
        return (
            <Routes>
                {privatRoutes.map(i =>
                    <Route key={i.path} path={i.path} element={<i.element />} />
                )}
            </Routes>
        )
    } else {
        return (
            <Routes>
                {localRoutes.map(i =>
                    <Route key={i.path} path={i.path} element={<i.element />} />
                )}
            </Routes>
        )
    }
}
