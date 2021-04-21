import "./styles/global.css";
import "./styles/pages.css";
import "./styles/components.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import ScrollToTop from "./helpers/ScrollToTop";
import { AuthProvider } from "./helpers/AuthProvider";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import PorjectDetails from "./pages/projects/Details";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/admin/Dashboard";
import HomePage from "./pages/admin/HomePage";
import ProjectIndex from "./pages/projects/Index";
import ProjectEdit from "./pages/projects/Edit";
import ContactView from "./pages/admin/ContactView";

function App() {
  return (
    <div className="main-body theme-normal">
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/contact" component={Contact} />
            <Route exact path="/projects/:id" component={PorjectDetails} />
            <Route exact path="/admin" component={Login} />
            <PrivateRoute path="/admin/dashboard" component={Dashboard} />
            <PrivateRoute path="/admin/home-page" component={HomePage} />
            <PrivateRoute exact path="/admin/projects" component={ProjectIndex} />
            <PrivateRoute path="/admin/projects/edit/:id" component={ProjectEdit} />
            <PrivateRoute path="/admin/contacts" component={ContactView} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;
