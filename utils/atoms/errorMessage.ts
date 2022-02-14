import { atom } from "recoil";

export const errorMessage = atom<string | null>({
  key: "errorMessage",
  default: null,
});
