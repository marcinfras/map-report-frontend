import { BrowserRouter, Route, Routes } from "react-router";
import { Register } from "./pages/(auth)/Register";
import { HomePage } from "./pages/HomePage";
import { Login } from "./pages/(auth)/Login";
import { AuthLayout } from "./pages/(auth)/AuthLayout";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<AuthLayout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
