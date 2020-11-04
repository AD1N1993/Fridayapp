import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {appReducer} from "./app-reducer";
import {recoveryReducer} from "../features/Recovery/recovery-reducer";
import {authReducer} from "../features/Login/auth-reducer";
import {signUpReducer} from "../features/SignUp/signup-reducer";
import {packsReducer} from "../features/Packs/Packs-reducer";
import {cardsReducer} from "../features/Cards/Cards-reducer";
import {learningProcessReducer} from "../features/LearningProcess/learningProcess-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    login: authReducer,
    signup: signUpReducer,
    recovery: recoveryReducer,
    packs: packsReducer,
    cards: cardsReducer,
    learningProcess: learningProcessReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer> ;

// @ts-ignore
window.store = store;