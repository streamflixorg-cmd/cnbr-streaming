import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Movies from "../pages/Movies/Movies";
import Series from "../pages/Series/Series";
import Search from "../pages/Search/Search";
import Login from "../pages/Login/Login";
import Admin from "../pages/Admin/Admin";
import NotFound from "../pages/NotFound/NotFound";

import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/movies" element={<Movies />} />

        <Route path="/series" element={<Series />} />

        <Route path="/search" element={<Search />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}