import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  Login,
  ForgotPassword,
  ResetPassword,
  HomePage,
  Contact,
  About,
  Events,
} from "../pages/client/";
import Navbar from "../pages/client/shared/Navbar";

const ClientRoute = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route component={Events} path="/events" />
          <Route component={Contact} path="/contact" />
          <Route component={About} path="/about" />
          <Route component={ForgotPassword} path="/forgot-password" />
          <Route component={ResetPassword} path="/reset-password/:token" />
          <Route exact component={Login} path="/login" />
          <Route component={HomePage} path="/" />
          <Route exact component={Login} path="*" />
        </Switch>
        {/* Footer here  */}
      </Router>
    </div>
  );
};

export default ClientRoute;
