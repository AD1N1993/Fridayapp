import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {appReducer} from "./app-reducer";
import {recoveryReducer} from "../features/Recovery/recovery-reducer";
import {authReducer} from "../features/Login/auth-reducer";
import {signUpReducer} from "../features/SignUp/signup-reducer";
import {PacksReducer} from "../features/Packs/Packs-reducer";
import {CardsReducer} from "../features/Cards/Cards-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    login: authReducer,
    signup: signUpReducer,
    recovery: recoveryReducer,
    packs: PacksReducer,
    cards: CardsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer> ;

// @ts-ignore
window.store = store;