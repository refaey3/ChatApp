import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import app from "./lib/FireBase";
function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(getAuth(app), async (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsub();
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <Chat /> : <Register />,
    },
    {
      path: "/Login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
  ]);
  if (loading) {
    return <p>loading</p>;
  }
  return <RouterProvider router={router} />;
}

export default App;
