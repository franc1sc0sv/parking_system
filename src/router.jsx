import { createBrowserRouter } from "react-router-dom";
import Animador from "./components/Routes/Animador";

import Home from "./pages/Home/Index";
import Login from "./pages/Login/Index";
import Register from "./pages/Register/Index";
import Reservations from "./pages/Reservations/Index";
import ParkingSlot from "./pages/ParkingSlot/Index";

const router = createBrowserRouter([
  {
    element: <Animador />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/reserves",
        element: <Reservations />,
      },
      {
        path: "/parkingSlot",
        element: <ParkingSlot />,
      },
    ],
  },
]);

export { router };
