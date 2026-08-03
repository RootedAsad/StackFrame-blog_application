import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import themeReducer from "./themeSlice";
import { persistStore, persistReducer } from "redux-persist";

const storage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
};


const userPersistConfig = {
  key: "user",
  storage: storage,
  whitelist: ["currentUser"],
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer), // ✅ yahan lagao
  theme: themeReducer,
});


const persistConfig = {
  key: "root",
  storage: storage,
  version: 1,
  whitelist: ["theme"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);