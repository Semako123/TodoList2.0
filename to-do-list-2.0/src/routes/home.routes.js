import App from "../App";
import RequireAuth from "../components/utilities/requireAuth";

const HomeRoute = [
  {
    path: "/",
    element: (
      <RequireAuth status={true}>
        <App />
      </RequireAuth>
    ),
  },
];
export default HomeRoute;
