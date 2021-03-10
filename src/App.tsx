import "./styles/global.css";
import "./styles/pages.css";
import "./styles/components.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { AuthProvider } from "./helpers/AuthProvider";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
function App() {
  return (
    <div className="main-body theme-normal">
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/contact" component={Contact} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;
