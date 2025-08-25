import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Register } from "./pages/(auth)/Register";
import { HomePage } from "./pages/HomePage";
import { Login } from "./pages/(auth)/Login";
import { AuthLayout } from "./pages/(auth)/AuthLayout";
import { GlobalSnackbar } from "./components/GlobalSnackbar";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<AuthLayout />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <GlobalSnackbar />
    </QueryClientProvider>
  );
};
