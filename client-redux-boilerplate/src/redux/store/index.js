import { configureStore, getDefaultMiddleware } from "redux-starter-kit";
import rootReducer from "../reducers";
// import createSagaMiddleware from "redux-saga";

// import rootSaga from "./sagas";

function configureAppStore(initialState) {
  const defaultMiddleware = getDefaultMiddleware();
  // const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    // middleware: [sagaMiddleware, ...defaultMiddleware],
    middleware: [...defaultMiddleware],
    initialState,
    enhancers: []
  });

  // sagaMiddleware.run(rootSaga)
  return store;
}

export default configureAppStore;
