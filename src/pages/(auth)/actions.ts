import type { LoginFormValues, RegisterFormValues } from "./authSchema";

export const loginFn = async (data: LoginFormValues) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Login failed:", errorData);
      throw Error(errorData.error);
    }

    const resData = await res.json();

    console.log("Login successful:", resData);
    return resData;
  } catch (error) {
    console.error("An error occurred during login:", error);
    throw error;
  }
};

export const registerFn = async (data: RegisterFormValues) => {
  if (data.password !== data.confirmPassword) {
    console.error("Passwords do not match");
    return;
  }

  const newUser = {
    fullName: data.fullName,
    email: data.email,
    password: data.password,
  };

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Login failed:", errorData);
      throw Error(errorData.error);
    }

    const resData = await res.json();

    console.log("Register successful:", resData);

    return resData;
  } catch (error) {
    console.error("An error occurred during registration:", error);
    throw error;
  }
};
