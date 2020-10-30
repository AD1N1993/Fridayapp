import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "./store";
import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {SetIsLoggedType, setIsLoggedAC} from "../features/Login/auth-reducer";

const initialState: InitialStateType = {
    isInitialized: false,
    status: "idle",
    error: null,
    myUserID: "",
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'APP_SET_INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        case "SET_STATUS_APP":
            return {...state, status: action.status}
        case "SET_MY_USER_ID":
            return {...state, myUserID: action.id}
        default:
            return state
    }
}

//Action creators
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP_SET_INITIALIZED', isInitialized} as const)
export const setStatusAppAC = (status: RequestStatusType) => ({type: 'SET_STATUS_APP', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'SET_APP_ERROR', error} as const)
export const setMyUserIdAC = (id: string) => ({type: 'SET_MY_USER_ID', id} as const)

//Thunk creators
export const initializeAppTC = () => (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(setStatusAppAC('loading'))
    authAPI.me()
        .then((res) => {
            dispatch(setStatusAppAC('succeeded'))
            dispatch(setIsLoggedAC(true));
            dispatch(setMyUserIdAC(res.data._id))
        })
        .catch((err) => {})
        .finally(() => {
            dispatch(setIsInitializedAC(true))
            dispatch(setStatusAppAC('succeeded'))
        })
}


//types
export type SetStatusApp = ReturnType<typeof setStatusAppAC >
export type SetUserId = ReturnType<typeof setMyUserIdAC >
type ActionsTypes =
    | ReturnType<typeof setIsInitializedAC>
    | SetStatusApp
    | ReturnType<typeof setAppErrorAC>
    | SetUserId
    | SetIsLoggedType

export type ThunkType = ThunkAction<Promise<void>, AppRootStateType, unknown, ActionsTypes>

type InitialStateType = {
    isInitialized: boolean
    status: RequestStatusType
    error: string | null,
    myUserID: string
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';






