import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const getVendorByQueryAtom = atom({
    key: "getVendorByQuery", // unique ID (with respect to other atoms/selectors)
    default: null,
    effects_UNSTABLE: [persistAtom], // default theme
});

export const getVendorByIdAtom = atom({
    key: "getVendorById", // unique ID (with respect to other atoms/selectors)
    default: null,
    effects_UNSTABLE: [persistAtom], // default theme
});

export const createVendorAtom = atom({
    key: "createVendor", // unique ID (with respect to other atoms/selectors)
    default: null,
    effects_UNSTABLE: [persistAtom], // default theme
});


export const vendorSrNo=atom({
    key: "vendorSrNo",
    default:null,
    effects_UNSTABLE:[persistAtom]
})

export const updateVendor=atom({
    key: "updateVendor", // unique ID (with respect to other atoms
    default: null,
    effects_UNSTABLE:[persistAtom], // default theme
}) 


export const getVendorsAtom = atom({
    key: "getVendors", // unique ID (with respect to other atoms/selectors)
    default: null,
    effects_UNSTABLE: [persistAtom], // default theme
  });
  
  ////////////// VendorByQuery ///////////////
  export const getVendorsByQueryAtom = atom({
    key: "getVendorsByQuery",
    default: null,
    effects_UNSTABLE: [persistAtom],
  });
  
  ////////////  POST //////////////
  export const postVendorsAtom = atom({
     key:"postVendors",
     default: null,
     effect_UNSTABLE:[persistAtom],
  });
  
  ///////////// PUT/////////////////
  export const putVendorsAtom = atom({
    key: "putVendors",
    default: null,
    effects_UNSTABLE: [persistAtom],
  });