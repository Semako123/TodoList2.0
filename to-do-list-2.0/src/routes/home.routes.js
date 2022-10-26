import App from "../App";
import RequireAuth from "../components/utilities/requireAuth";

const HomeRoute = [
  {
    path: "/",
    element: (
      <RequireAuth>
        <App />
      </RequireAuth>
    ),
  },
];
export default HomeRoute;
