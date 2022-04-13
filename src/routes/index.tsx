import React from 'react'

const Login = React.lazy(() => import('../pages/Login/Login'))
const Error404 = React.lazy(() => import('../pages/Error404/Error404'))
const Contacts = React.lazy(() => import('../pages/Contacts/Contacts'))

export const privatRoutes = [
  { path: '/contacts', element: Contacts },
  { path: '*', element: Error404 },
]
export const localRoutes = [
  { path: '/contacts', element: Contacts },
  { path: '/', element: Login },
  { path: '*', element: Error404 },
]
