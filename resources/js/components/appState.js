import create from "zustand";
import { persist } from 'zustand/middleware'

const defaultAuthState = {
  email: '',
  loggedIn: false,
  permissions: [],
};

const useAuthStore = create(persist(
  (set, get) => ({
    ...defaultAuthState,

    setLoggedIn: (data) => {
      return set((state) => {
        const ourTempState = {
          email: data.email,
          permissions: data.permissions,
          loggedIn: true
        };

        return ourTempState;
      });
    },

    setLoggedOut: () => {
      return set((state) => {
        return defaultAuthState;
      });
    }
  }),
  {
    name: 'authStorage',
    // getStorage: () =>
    //   /**
    //    * (optional) by default, 'local storage' is used
    //    * but personally, i use sessionStorage so that it will only
    //    * be stored in the current tab/window i am on and will not
    //    * affect other tabs.
    //    * 
    //    * because of the 'persist' middle-ware, the above
    //    * saveToBrowserStorage & takeFromBrowserStorage are now 
    //    * obsolete
    //    */
    //   sessionStorage,
  }
));

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

const defaultDataGridState = {
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

const useBookStore = create(
  persist(
    (set, get) => ({
      ...defaultDataGridState,
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

const useUserStore = create(
  persist(
    (set, get) => ({
      ...defaultDataGridState,
      refresh: () => {
        return set((state) => ({
          dataGridVersion: state.dataGridVersion + 1
        }));
      }
    }),
    {
      name: 'userStorage',
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
  , useUserStore
};