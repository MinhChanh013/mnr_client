export const handleActiveNav = (isActiveNav, handleActive) => {
  const navLocalStorage = localStorage.getItem("nav");
  if (isActiveNav && navLocalStorage) {
    const navActive = navLocalStorage.split(",");
    if (navActive && navActive.length > 0) {
      handleActive(navActive)
    }
  }
};
