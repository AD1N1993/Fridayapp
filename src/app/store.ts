import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {appReducer} from "./app-reducer";
import {recoveryReducer} from "../features/Recovery/recovery-reducer";
import {initiateReducer} from "../features/Initiate/initiate-reducer";
import {authReducer} from "../features/Login/auth-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    login: authReducer,
    signup: appReducer,
    recovery: recoveryReducer,
    initiate: initiateReducer

});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer> ;

// @ts-ignore
window.store = store;