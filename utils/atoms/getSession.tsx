import { User } from "firebase/auth";
import { atom } from "recoil";

export const getSession = atom<User | null>({
  key: "getSession",
  default: null,
});
