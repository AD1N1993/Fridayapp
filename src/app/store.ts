import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {appReducer} from "./app-reducer";
import {recoveryReducer} from "../features/Recovery/recovery-reducer";
import {signupReducer} from "../features/SignUp/signup-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    login: appReducer,
    signup: signupReducer,
    recovery: recoveryReducer,

});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer> ;

// @ts-ignore
window.store = store;