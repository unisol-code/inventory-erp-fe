import { atom } from "recoil";
import { createPersistedAtom } from "../recoilConfig";


export const proposalListAtom = atom(
  createPersistedAtom("proposalsList", [])
);

export const proposalDetailsAtom = atom(
  createPersistedAtom("proposalDetails", null)
);

export const proposalSrNoAtom = atom(
  createPersistedAtom("proposalSrNo", null)
);

export const proposalTypeAtom = atom(
  createPersistedAtom("proposalType", [])
);

export const responsibleDepartmentsAtom = atom(
  createPersistedAtom("responsibleDepartment", [])
)

export const clientNamesAtom = atom(
  createPersistedAtom("clientNames", [])
)

export const assignedToAtom = atom(
  createPersistedAtom("assignedTo", [])
)