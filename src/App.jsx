import { useState } from "react";
import "./App.css";
import { useRoutes } from "react-router-dom";
import Forside from "./pages/Forside/Forside";
import Personalt from "./pages/Personalt/Personalt";
import Kontakt from "./pages/Kontakt/Kontakt";
import Kurv from "./pages/Kurv/Kurv";
import Tak from "./components/Tak/Tak";
import DishDetailPage from "./pages/Detail/DishDetailPage";
import ProtectedRoute from "./components/login/ProtectedRoute";
import Login from "./components/login/Login";
import { useAuthContext } from "./context/useAuthContext";
import BackofficeDishesPage from "./pages/Backoffice/Dishes/BackofficeDishesPage";
import BackofficeOrdersPage from "./pages/Backoffice/Orders/BackofficeOrdersPage";
import BackofficeEmployeesPage from "./pages/Backoffice/Employees/BackofficeEmployeePage";

function App() {
  const { signedIn } = useAuthContext();
  const routes = useRoutes([
    { path: "/", element: <Forside /> },
    { path: "/forside", element: <Forside /> },
    { path: "/personalt", element: <Personalt /> },
    { path: "/kontakt", element: <Kontakt /> },
    { path: "/dish/:id", element: <DishDetailPage /> },
    { path: "/kurv", element: <Kurv /> },
    { path: "/tak", element: <Tak /> },
    { path: "/login", element: <Login /> },
  ]);

  return (
    <div className="app">
      <div className="main">{routes}</div>
      {signedIn && (
        <ProtectedRoute isAllowed={signedIn}>
          <BackofficeDishesPage />
          <BackofficeEmployeesPage />
          <BackofficeOrdersPage />
        </ProtectedRoute>
      )}
    </div>
  );
}

export default App;