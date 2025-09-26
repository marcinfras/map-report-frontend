import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Register } from "./pages/(auth)/Register";
import { HomePage } from "./pages/HomePage";
import { Login } from "./pages/(auth)/Login";
import { AuthLayout } from "./pages/(auth)/AuthLayout";
import { GlobalSnackbar } from "./components/GlobalSnackbar";
import { AppLayout } from "./components/AppLayout";
import { GuestRoute } from "./components/GuestRoute";
import { Map } from "./pages/map/Map";
import { PinDetailsPage } from "./pages/map/pins/PinDetailsPage";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="map">
              <Route index element={<Map />} />
              <Route path="pins/:id" element={<PinDetailsPage />} />
            </Route>
            <Route element={<GuestRoute />}>
              <Route element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <GlobalSnackbar />
    </QueryClientProvider>
  );
};
