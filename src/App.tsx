import "./global.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { AuthProvider } from "./helpers/AuthProvider";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <div className="main-body">
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;
