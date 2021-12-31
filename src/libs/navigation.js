import update from "immutability-helper";

import { useRecoilState } from "recoil";
import { navState } from "../recoil/atoms";
import { defaultNavigationDomain } from "../config";

export const useNavigation = () => {
  const [nav, setNav] = useRecoilState(
    navState({ domain: defaultNavigationDomain })
  );
  const closeDialog = () => {
    setNav((x) => update(x, { openState: { $set: false } }));
  };
  const openDialog = () => {
    setNav((x) => update(x, { openState: { $set: true } }));
  };
  const toggleDialog = () => {
    setNav((x) => update(x, { $toggle: ["openState"] }));
  };
  const setAppDomain = (name) => {
    setNav((x) => update(x, { domain: { $set: name } }));
  };
  const out = {
    nav,
    setNav,
    closeDialog,
    openDialog,
    toggleDialog,
    setAppDomain,
  };
  return out;
};
