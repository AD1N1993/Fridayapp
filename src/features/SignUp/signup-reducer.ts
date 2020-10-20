import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../../app/store";
import {authAPI, RegisteredParamsType} from "../../api/api";


const initialState: InitialStateType = {
    isRegistered: false,
    registrationLoad: false
}

export const signUpReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SET-IS-REGISTERED':
            return {...state, isRegistered: action.isRegistered}
        case "SET-LOADING-REGISTER":
            return {...state, registrationLoad: action.loading}
        default:
            return state
    }
}

//Action creators
export const setIsRegisteredAC = (isRegistered: boolean) => ({type: 'SET-IS-REGISTERED', isRegistered} as const)
export const setLoadingRegisterAC = (loading: boolean) => ({type: 'SET-LOADING-REGISTER', loading} as const)


//Thunk creators
export const registrationTC = (data: RegisteredParamsType) => {
    return  (dispatch: any) => {
        dispatch(setLoadingRegisterAC(true))
        authAPI.registered(data)
            .then( (res) => {
                dispatch(setIsRegisteredAC(true))
                dispatch(setLoadingRegisterAC(false))
            })
    }
}

//types
type ActionsTypes =
    | ReturnType<typeof setIsRegisteredAC>
    | ReturnType<typeof setLoadingRegisterAC>


type ThunksDispatch = ThunkAction<Promise<void>, AppRootStateType, unknown, ActionsTypes>

type InitialStateType = {
    isRegistered: boolean
    registrationLoad: boolean
};







