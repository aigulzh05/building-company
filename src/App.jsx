import * as React from "react";
import { Routes, Route } from "react-router-dom";

import { AuthProvider, RequireAuth } from "./service/authProvider";
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


export default function App() {
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
