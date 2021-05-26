import "./styles/global.css";
import "./styles/pages.css";
import "./styles/components.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ScrollToTop from "./helpers/ScrollToTop";
import AuthProvider from "./contexts/AuthProvider";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import PorjectDetails from "./pages/projects/Details";
import AdminRoute from "./components/routes/AdminRoute";
import Dashboard from "./pages/admin/Dashboard";
import HomePage from "./pages/admin/HomePage";
import ProIndex from "./pages/projects/Index";
import ProEdit from "./pages/projects/Edit";
import ProCreate from "./pages/projects/Create";
import ContactView from "./pages/admin/ContactView";
import { PopupContainer } from "./components/PopupManager";

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
            <AdminRoute path="/admin/dashboard" component={Dashboard} />
            <AdminRoute path="/admin/home-page" component={HomePage} />
            <AdminRoute exact path="/admin/projects" component={ProIndex} />
            <AdminRoute path="/admin/projects/edit/:id" component={ProEdit} />
            <AdminRoute path="/admin/projects/create" component={ProCreate} />
            <AdminRoute path="/admin/contacts" component={ContactView} />
          </Switch>
        </BrowserRouter>
        <PopupContainer />
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;
