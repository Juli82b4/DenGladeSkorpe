import { useState } from "react";
import "./App.css";
import { useRoutes, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Forside from "./pages/Forside/Forside";
import Personalt from "./pages/Personalt/Personalt";
import Kontakt from "./pages/Kontakt/Kontakt";
import Kurv from "./pages/Kurv/Kurv";
import Tak from "./components/Tak/Tak";

function App() {
  const routes = useRoutes([
    { path: "/", element: <Forside /> },
    { path: "/personalt", element: <Personalt /> },
    { path: "/kontakt", element: <Kontakt /> },
    { path: "/kurv", element: <Kurv /> },
    { path: "/tak", element: <Tak /> },
  ]);

  return routes;
}

export default App;
