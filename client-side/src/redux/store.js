import { createStore, applyMiddleware, compose } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const config = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
  // blacklist: ["paintings", "uploadReducer", "currentUploads", "tagReducer"],
  whitelist: ["session"],
};

const persistedReducer = persistReducer(config, rootReducer);

// CONFIG WITH DEVTOOLS
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  const persistor = persistStore(store);
  return { store, persistor };
};
