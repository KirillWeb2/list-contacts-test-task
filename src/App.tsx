import React, { Suspense } from 'react'
import { AuthContext } from './context/AuthContext'
import { useAppSelector } from './hooks/ReduxHooks'
import { useAuthHook } from './hooks/useAuthHook'
import { useRoutes } from './routes/route'
import s from './App.module.scss'

function App() {
  const { isAuth, isLoadingAuth, logout, login } = useAuthHook()

  const { isAuthUser } = useAppSelector(state => state.userReducer)

  const routes = useRoutes(isAuthUser)

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        isLoadingAuth,
        logout,
        login
      }}
    >
      <div className={'container'}>
        <Suspense fallback={<h1 className={s.loader}>Загрузка...</h1>}>
          {routes}
        </Suspense>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
