import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "./store";


const APP_SET_INITIALIZED = "APP_SET_INITIALIZED";

const initialState: InitialStateType = () => {

}

export const appReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case APP_SET_INITIALIZED:
            return {...state, isInitialized: true}
        default:
            return {...state}
    }
}

//Action creators

export const setIsInitializedAC = () => ({type: APP_SET_INITIALIZED} as const)

//Thunk creators
export const initializedAppTC = ():ThunkType =>{
    return async (dispatch)=>{

    }
}

//types
type InitialStateType = {};

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type ThunkType = ThunkAction<Promise<void>, AppRootStateType, unknown, ActionsTypes>


type SetIsInitializedActionType = ReturnType<typeof setIsInitializedAC>

type ActionsTypes =  SetIsInitializedActionType