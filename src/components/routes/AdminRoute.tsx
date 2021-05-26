import { Route, Redirect } from "react-router-dom";
import useAuth from "./../../hooks/useAuth";
import AdminLayout from "./../../pages/layouts/AdminLayout";
interface Iprops {
  path: string;
  component?: Function;
  children?: any;
  exact?: any;
}
function AdminRoute({ path, component, children, ...rest }: Iprops) {
  const auth = useAuth();
  return (
    <div>
      {auth.user.isAuth ? (
        children ? (
          <Route render={() => <AdminLayout Content={() => children} {...rest} />} />
        ) : (
          <Route component={() => <AdminLayout Content={component} />} {...rest} />
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

export default AdminRoute;
