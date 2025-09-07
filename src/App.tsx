import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Register } from "./pages/(auth)/Register";
import { HomePage } from "./pages/HomePage";
import { Login } from "./pages/(auth)/Login";
import { AuthLayout } from "./pages/(auth)/AuthLayout";
import { GlobalSnackbar } from "./components/GlobalSnackbar";
import { AppLayout } from "./components/AppLayout";
import { GuestRoute } from "./components/GuestRoute";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
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
