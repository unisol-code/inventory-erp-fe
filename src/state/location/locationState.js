import { atom } from 'recoil';
import { createPersistedAtom } from "../recoilConfig";

export const countryLocationAtom = atom(createPersistedAtom("countryLocation", []));

export const stateLocationAtom = atom(createPersistedAtom("stateLocation", []));

export const cityLocationAtom = atom(createPersistedAtom("cityLocation", []));