import React from "react";
import { AdminRoutes, ClientRoutes } from "./routes/";
import { isAuthenticated } from "./redux/store/authStore";
import { useSelector } from "react-redux";

function App() {
  const isAuth = useSelector(isAuthenticated);
  console.log("ISAuth", isAuth);
  return <div>{isAuth ? <AdminRoutes /> : <ClientRoutes />}</div>;
}

export default App;
