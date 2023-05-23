import * as React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import { AuthProvider, RequireAuth, useAuth } from "./service/authProvider";
import { Layout } from "./pages/Layout";
import { LoginPage } from "./pages/Login";
import { HomePage } from "./pages/Home";
import { UserPage } from "./pages/User";
import { AboutPage } from "./pages/About";
import { BuildingsPage } from "./pages/Buildings";
import { ApartmentsPage } from "./pages/Apartment";
import { ContactPage } from "./pages/Contact";
import { PositionPage } from "./pages/Position";
import { GlobalTypePage } from "./pages/GlobalType";
import { SubTypePage } from "./pages/SubType";
import { ProductPage } from "./pages/Product";
import { SettingsPage } from "./pages/Settings";
import { AddBuildingPage } from "./pages/AddBuilding";
import { AddApartmentPage } from "./pages/AddApartment";
import { PurcaseRequestPage } from "./pages/PurcaseRequest";
import { AddNewsPage } from "./pages/AddNews";

import { useEffect } from "react";
import AuthService from "./service/auth";
import UserService from "./service/user";

export default function App() {
  let auth = useAuth();
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  // useEffect(() => {
    // checkAuth();
  // }, []);
  const checkAuth = () => {
    AuthService.refreshToken()
      .then((res) => {
        if (res.data.accessToken && res.data.refreshToken) {
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("refresh-token", res.data.refreshToken);
          getMeFromServer();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  const getMeFromServer = () => {
    UserService.detailMe()
      .then((res) => {
        if (res.data)
          auth.signin(res.data, () => {
            // Send them back to the page they tried to visit when they were
            // redirected to the login page. Use { replace: true } so we don't create
            // another entry in the history stack for the login page.  This means that
            // when they get to the protected page and click the back button, they
            // won't end up back on the login page, which is also really nice for the
            // user experience.
            navigate(from, { replace: true });
          });
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/build" element={<BuildingsPage />} />
          <Route path="/apartment" element={<ApartmentsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/position"
            element={
              <RequireAuth>
                <PositionPage />
              </RequireAuth>
            }
          />
          <Route
            path="/addBuild"
            element={
              <RequireAuth>
                <AddBuildingPage />
              </RequireAuth>
            }
          />
          <Route
            path="/addApartment"
            element={
              <RequireAuth>
                <AddApartmentPage />
              </RequireAuth>
            }
          />
          <Route
            path="/purcase"
            element={
              <RequireAuth>
                <PurcaseRequestPage />
              </RequireAuth>
            }
          />
          <Route
            path="/addNews"
            element={
              <RequireAuth>
                <AddNewsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/global"
            element={
              <RequireAuth>
                <GlobalTypePage />
              </RequireAuth>
            }
          />
          <Route
            path="/sub"
            element={
              <RequireAuth>
                <SubTypePage />
              </RequireAuth>
            }
          />
          <Route
            path="/product"
            element={
              <RequireAuth>
                <ProductPage />
              </RequireAuth>
            }
          />
          <Route
            path="/settings"
            element={
              <RequireAuth>
                <SettingsPage />
              </RequireAuth>
            }
          />

          <Route
            path="/user"
            element={
              <RequireAuth>
                <UserPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<p>Not Found</p>} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
