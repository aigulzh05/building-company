import * as React from "react";
import { Routes, Route } from "react-router-dom";

import { AuthProvider, RequireAuth } from "./service/authProvider";
import { Layout } from "./pages/Layout";
import { LoginPage } from "./pages/Login";
import { HomePage } from "./pages/Home";
import { EditPage } from "./pages/Edit";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/edit"
            element={
              <RequireAuth>
                <EditPage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
