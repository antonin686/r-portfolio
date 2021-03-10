import { Link, useHistory } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

import useAuth from "../hooks/useAuth";

function MacNav() {
  const auth = useAuth();
  const history = useHistory();

  function handleSignOut() {
    auth.signOut();
    history.push("/admin");
  }
  return (
    <div>
      {auth.user.isAuth ? (
        <div className="macnav-wrapper">
          <div className="mac-dots">
            <Link to="/admin/dashboard" className="nav-wrapper">
              <div className="dot-red"></div>
              <div className="dot-yellow"></div>
              <div className="dot-green"></div>
            </Link>
          </div>
          <div className="nav-wrapper">
            <div>Welcome,{auth.user.username}</div>   
            <div className="link-divider">|</div>       
            <button className="btn-link" onClick={handleSignOut}><FaSignOutAlt className="icon text-danger"/></button>
          </div>
        </div>
      ) : (
        <div className="macnav-wrapper">
          <div className="mac-dots">
            <Link to="/" className="nav-wrapper">
              <div className="dot-red"></div>
              <div className="dot-yellow"></div>
              <div className="dot-green"></div>
            </Link>
          </div>
          <div className="nav-wrapper">
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default MacNav;
