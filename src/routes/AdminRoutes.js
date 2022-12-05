import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../components/Layout/admin/Header";
import SideBar from "../components/Layout/admin/SideBar";
import {
  ClientPage,
  Dashboard,
  UserPage,
  EventPage,
  AddEvent,
} from "../pages/admin";
import EventDetailPage from "../pages/admin/EventDetailPage";
import QRgenerator from "../pages/admin/QRgenerator";
import QRscanner from "../pages/admin/QRscanner";

const AdminRoute = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        <div>
          <SideBar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
          <div className="md:pl-64 flex flex-col">
            <Header setSidebarOpen={setSidebarOpen} />
            <main className="flex-1 pb-8 ">
              <Switch>
                <Route
                  exact
                  component={EventDetailPage}
                  path="/admin/event-detail/:id"
                />
                <Route exact component={UserPage} path="/admin/users" />
                <Route exact component={ClientPage} path="/admin/clients" />
                <Route exact component={EventPage} path="/admin/events" />
                <Route exact component={AddEvent} path="/admin/add-event" />
                <Route exact component={QRgenerator} path="/admin/generate" />
                <Route exact component={QRscanner} path="/admin/scan" />
                <Route exact component={Dashboard} path="*" />
                <Route exact component={Dashboard} path="/" />
              </Switch>
            </main>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default AdminRoute;
