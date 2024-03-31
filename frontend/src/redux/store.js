import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers/rootReducer";

const persistConfig = {
  key: "root",
  storage,
};

// const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(rootReducer);

// let persistor = persistStore(store);
export { store };
// export default store;
