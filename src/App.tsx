import React from "react";

import { AuthContext } from "./context/AuthContext";
import { useAuthHook } from "./hooks/useAuthHook";
import { useRoutes } from "./routes/route";

function App() {
  const { isAuth, isLoadingAuth, logout, login } = useAuthHook();

  const userJson = JSON.parse(localStorage.getItem("authData")! as string);

  const auth = !!userJson?.email || isAuth;

  const routes = useRoutes(auth);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        isLoadingAuth,
        logout,
        login,
      }}
    >
      <div className={"container"}>
        <React.Suspense fallback={<h1 className={"loader"}>Загрузка...</h1>}>
          {routes}
        </React.Suspense>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
