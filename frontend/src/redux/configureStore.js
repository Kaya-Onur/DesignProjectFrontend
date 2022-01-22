import { createStore,applyMiddleware,compose } from "redux";
import authReducer from "./authReducer";
import SecureLS from "secure-ls";
import thunk from "redux-thunk";

const secureLs=new SecureLS();

const getStateFromStorage = () => {
  const carAuth = secureLs.get("car-auth");

  let stateInLocalStorage = {
    isLoggedIn: false,
    userEmail: undefined,
    userFirstName: undefined,
    userLastName: undefined,
    userId: undefined,
    userRoleId: undefined,
    userPassword: undefined,
  };

  if (carAuth) {
      return carAuth;
  }

  return stateInLocalStorage;
};

const updateInStorage = (store) => {
  secureLs.set("car-auth", store);
};

const configureStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    authReducer,
    getStateFromStorage(),
    composeEnhancers(applyMiddleware(thunk))
  );
  store.subscribe(() => {
    updateInStorage(store.getState());
  });
  return store;
};

export default configureStore;
