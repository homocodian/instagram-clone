import { atom } from "recoil";

export const getStoryState = atom<string | null>({
  key: "getStoryState",
  default: null,
});
