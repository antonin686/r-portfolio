import { Route, Redirect } from "react-router-dom";
import useAuth from "./../hooks/useAuth";

function PrivateRoute({ children, ...rest }: any) {
  const auth = useAuth();

  return (
    <div>
      {auth.user.isAuth ? (
        children ? (
          <Route render={children} />
        ) : (
          <Route {...rest} />
        )
      ) : (
        <Route
          render={({ location }) => (
            <Redirect to={{ pathname: "/admin", state: { from: location } }} />
          )}
        />
      )}
    </div>
  );
}

export default PrivateRoute;
