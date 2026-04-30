import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const proposalListAtom = atom({
  key: "proposalsList",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const proposalDetailsAtom = atom({
  key: "proposalDetails",
  default: null,
  effects_UNSTABLE: [persistAtom]
});

export const proposalSrNoAtom = atom({
  key: "proposalSrNo",
  default: null,
  effects_UNSTABLE: [persistAtom]
});

export const proposalTypeAtom = atom({
  key: "proposalType",
  default: [],
  effects_UNSTABLE: [persistAtom]
});

export const responsibleDepartmentsAtom = atom({
  key: "responsibleDepartment",
  default: [],
  effects_UNSTABLE: [persistAtom]
})

export const clientNamesAtom = atom({
  key: "clientNames",
  default: [],
  effects_UNSTABLE: [persistAtom]
})

export const assignedToAtom = atom({
  key: "assignedTo",
  default: [],
  effects_UNSTABLE: [persistAtom]
})