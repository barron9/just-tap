import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import reduxThunkMiddleware from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "../reducers";
import { rootSaga } from "../sagas";

const loggerMiddleware = createLogger({
  collapsed: true
});

const sagaMiddleware = createSagaMiddleware();

export const createReduxStore = (initialState?: {}) => {
  const middlewares = [loggerMiddleware, reduxThunkMiddleware, sagaMiddleware];
  const enhancer = compose(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, initialState!, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
};
