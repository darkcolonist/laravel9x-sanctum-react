import create from "zustand";

const defaultState = {
  email: '',
  loggedIn: false
};

const saveToBrowserStorage = (key, data) => {
  const dataString = JSON.stringify(data);
  localStorage.setItem(key, dataString);
}

const takeFromBrowserStorage = (key) => {
  const dataString = localStorage.getItem(key);

  var returnData = {};

  try {
    returnData = JSON.parse(dataString);
  } catch (error) {}

  return returnData;
}

const storageAuth = takeFromBrowserStorage("auth");

// console.log('loaded auth', storageAuth);

const useAuthStore = create((set) => ({
  email: storageAuth ? storageAuth["email"] : defaultState["email"],
  loggedIn: storageAuth ? storageAuth["loggedIn"] : defaultState["loggedIn"],
  // loggedIn: takeFromBrowserStorage("auth")["loggedIn"],

  setLoggedIn: (data) => {
    return set((state) => {
      // save also into browser storage
      const ourTempState = {
        email: data.email,
        loggedIn: true
      };

      saveToBrowserStorage("auth", ourTempState);

      return ourTempState;
    });
  },

  setLoggedOut: () => {
    return set((state) => {
      // save also into browser storage
      saveToBrowserStorage("auth", defaultState);

      return defaultState;
    });
  }
}));

export { useAuthStore };