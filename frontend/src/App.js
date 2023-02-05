import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/movies/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { useState, useEffect } from "react";
import Considering from "./pages/movies/Considering";
import Completed from "./pages/movies/Completed";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  let TOKEN = localStorage.getItem("token");
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get('/api/users/me', {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + TOKEN,
          },
        })
        .catch((err) => console.log(err))
        .then((resp) => setUser(resp.data));
    };
    fetchUser();
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/watchlist"
            element={
              <PrivateRoute>
                <Dashboard
                  user={user}
                  query={query}
                  setQuery={setQuery}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/considering"
            element={
              <PrivateRoute>
                <Considering
                  user={user}
                  query={query}
                  setQuery={setQuery}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/completed"
            element={
              <PrivateRoute>
                <Completed
                user={user}
                query={query}
                setQuery={setQuery}
                />
              </PrivateRoute>
            }
          />
          <Route
          path="/login"
          element={<Login />}
          />
          <Route
          path="/register"
          element={<Register />}
          />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;