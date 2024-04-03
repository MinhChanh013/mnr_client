import { useEffect } from "react";
import { handleActiveNav } from "../utils/nav.utils";

export const useActiveNav = (dependency, isCheck, handleActive) => {
  useEffect(() => {
    handleActiveNav(isCheck, (navActive) => {
      handleActive(navActive);
    });
  }, [...dependency]);
};
