import create from "zustand";
import { persist } from 'zustand/middleware'

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

const defaultBookState = {

  dataGridPage: 0,
  dataGridSortModel: [],
  dataGridPageSize: 10,
  dataGridKeyword: "",
  /** 
   * increment this if you want the grid to refresh without changing
   * other props.
   */
  dataGridVersion: 0,
};
// const useBookStore = create((set) => ({
//   ...defaultBookState,

//   refresh: () => {
//     return set((state) => ({
//       dataGridVersion: state.dataGridVersion + 1
//     }));
//   }
// }));
const useBookStore = create(
  persist(
    (set, get) => ({
        ...defaultBookState,
        refresh: () => {
          return set((state) => ({
            dataGridVersion: state.dataGridVersion + 1
          }));
        }
    }),
    {
      name: 'bookStorage',
      getStorage: () =>
        /**
         * (optional) by default, 'local storage' is used
         * but personally, i use sessionStorage so that it will only
         * be stored in the current tab/window i am on and will not
         * affect other tabs.
         * 
         * because of the 'persist' middle-ware, the above
         * saveToBrowserStorage & takeFromBrowserStorage are now 
         * obsolete
         */
        sessionStorage,
    }
  )
);

export { 
  useAuthStore
  , useSnackbarStore
  , useDialogStore
  , useBookStore
};