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
      throw Error(errorData.error);
    }

    const resData = await res.json();

    return resData;
  } catch (error) {
    throw Error((error as Error).message);
  }
};

export const registerFn = async (data: RegisterFormValues) => {
  if (data.password !== data.confirmPassword) {
    throw Error("Passwords do not match");
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
      throw Error(errorData.error);
    }

    const resData = await res.json();

    return resData;
  } catch (error) {
    throw Error((error as Error).message);
  }
};
