import axios from "axios";
import storage from "local-storage-fallback";

export const api = axios.create({
  baseURL: "http://localhost:3003",
  headers: {
    Authorization: storage.getItem("@SB/token")
      ? `Bearer ${storage.getItem("@SB/token")}`
      : null,
  },
});
