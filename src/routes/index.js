import { createBrowserRouter } from "react-router-dom";
import Members from "./pages/Members";
import MatchMaking from "./pages/MatchMaking";
import Matches from "./pages/Matches";

const router = createBrowserRouter([
  {
    path: "/members",
    element: <Members />,
  },
  {
    path: "/matchmaking",
    element: <MatchMaking />,
  },
  {
    path: "/matches",
    element: <Matches />,
  },
]);

export default router;
