import create from "zustand";

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

const defaultState = {
  email: '',
  loggedIn: false,
  permissions: [],
};
const storageAuth = takeFromBrowserStorage("auth");

const authStoreFields = {};

for (const defaultStateKey in defaultState) {
  if (Object.hasOwnProperty.call(defaultState, defaultStateKey)) {
    const element = defaultState[defaultStateKey];
    authStoreFields[defaultStateKey] = storageAuth ? storageAuth[defaultStateKey] : element;
  }
}

const useAuthStore = create((set) => ({
  ...authStoreFields,
  // email: storageAuth ? storageAuth["email"] : defaultState["email"],
  // loggedIn: storageAuth ? storageAuth["loggedIn"] : defaultState["loggedIn"],
  // permissions: storageAuth ? storageAuth["permissions"] : defaultState["permissions"],

  setLoggedIn: (data) => {
    return set((state) => {
      // save also into browser storage
      const ourTempState = {
        email: data.email,
        permissions: data.permissions,
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

const defaultSnackbarState = {
  message: "hello",
  severity: "info",
  open: false,
};

const useSnackbarStore = create((set) => ({
  ...defaultSnackbarState,

  show: (message, severity) => {
    return set((state) => {
      const ourTempState = {
        message: message,
        severity: severity || defaultSnackbarState.severity,
        open: true
      };

      return ourTempState;
    });
  },

  hide: () => {
    return set((state) => ({ open: false }));
  }
}));

const defaultDialogState = {
  open: false,
  element: "",
  elementProps: {}
}

const useDialogStore = create((set) => ({
  ...defaultDialogState,

  show: (element, elementProps) => {
    return set((state) => {
      const ourTempState = {
        element,
        elementProps,
        open: true
      };

      return ourTempState;
    });
  },

  hide: () => {
    return set((state) => ({ open: false }));
  }
}));

export { 
  useAuthStore
  , useSnackbarStore
  , useDialogStore
};