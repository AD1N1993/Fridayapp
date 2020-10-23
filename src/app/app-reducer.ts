import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "./store";
import {Dispatch} from "redux";
import {authAPI} from "../api/api";

const initialState: InitialStateType = {
    isInitialized: false,
    status: "idle",
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'APP_SET_INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        case "SET_STATUS_APP":
            return {...state, status: action.status}
        default:
            return state
    }
}

//Action creators
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP_SET_INITIALIZED', isInitialized} as const)
export const setStatusAppAC = (status: RequestStatusType) => ({type: 'SET_STATUS_APP', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'SET_APP_ERROR', error} as const)

//Thunk creators
export const initializeAppTC = () => (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(setStatusAppAC('loading'))
    authAPI.me()
        .then((res) => {
            dispatch(setStatusAppAC('succeeded'))
        })
        .catch((err) => {
            alert(err)
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
        })
}


//types
type ActionsTypes =
    | ReturnType<typeof setIsInitializedAC>
    | ReturnType<typeof setStatusAppAC>
    | ReturnType<typeof setAppErrorAC>

export type ThunkType = ThunkAction<Promise<void>, AppRootStateType, unknown, ActionsTypes>

type InitialStateType = {
    isInitialized: boolean
    status: RequestStatusType
    error: string | null
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';






