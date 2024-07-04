import { atom } from "jotai";
import { MovieBasic } from "./types";

export const moviesAtom = atom<MovieBasic[]>([]);
export const movieTitleAtom = atom<string>("");
