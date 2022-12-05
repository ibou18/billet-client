import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Login, ForgotPassword, ResetPassword } from "../pages/client/";

const ClientRoute = () => {
  return (
    <div>
      <Router>
        {/* Navbar here  */}
        <Switch>
          <Route component={ForgotPassword} path="/forgot-password" />
          <Route component={ResetPassword} path="/reset-password/:token" />
          <Route exact component={Login} path="/" />
          <Route exact component={Login} path="*" />
        </Switch>
        {/* Footer here  */}
      </Router>
    </div>
  );
};

export default ClientRoute;
