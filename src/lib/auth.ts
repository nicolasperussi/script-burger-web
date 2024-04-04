import storage from "local-storage-fallback";
import { api } from "./api";

export const TOKEN_KEY = "@SB/token";

export const isAuthenticated = () => storage.getItem(TOKEN_KEY) !== null;

export const getToken = () => storage.getItem(TOKEN_KEY);

export const login = (email: string, password: string) => {
  api
    .post("/auth/login", {
      email,
      password,
    })
    .then((res) => {
      const token = res.data.token;
      const user = res.data.user;
      storage.setItem(TOKEN_KEY, token);
      storage.setItem("@SB/user", JSON.stringify(user));
    })
    .then(() => window.location.reload());
};

export const getUser = () => JSON.parse(storage.getItem("@SB/user")!) || null;

export const logout = () => {
  storage.removeItem("@SB/user");
  storage.removeItem(TOKEN_KEY);
  window.location.reload();
};
