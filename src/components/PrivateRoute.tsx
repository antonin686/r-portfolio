import { Route, Redirect } from "react-router-dom";
import useAuth from "./../hooks/useAuth";

function PrivateRoute({ children, ...rest }: any) {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user.isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/admin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
