import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../../app/store";
import {authAPI, RegistrationParamsType} from "../../api/api";


const initialState: InitialStateType = {
    isRegistered: false,
    registrationLoad: false,
    registrationError: null
}

export const signUpReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SET-IS-REGISTERED':
            return {...state, isRegistered: action.isRegistered}
        case "SET-LOADING-REGISTER":
            return {...state, registrationLoad: action.loading}
        case "SET-REGISTRATION-ERROR":
            return {...state, registrationError: action.error}
        default:
            return state
    }
}

//Action creators
export const setIsRegisteredAC = (isRegistered: boolean) => ({type: 'SET-IS-REGISTERED', isRegistered} as const)
export const setRegistrationLoadAC = (loading: boolean) => ({type: 'SET-LOADING-REGISTER', loading} as const)
export const setRegistrationErrorAC = (error: null | string) => ({type: 'SET-REGISTRATION-ERROR', error} as const)


//Thunk creators
export const registrationTC = (data: RegistrationParamsType) => {
    return  (dispatch: any) => {
        dispatch(setRegistrationLoadAC(true))
        authAPI.registered(data)
            .then( (res) => {
                dispatch(setIsRegisteredAC(true))
            })
            .catch( (error) => {
                dispatch(setRegistrationErrorAC(error.response.data.error))
                setTimeout(() => dispatch(setRegistrationErrorAC("")), 5000);
            })
            .finally( () => {
                dispatch(setRegistrationLoadAC(false))
            })
    }
}

//types
type ActionsTypes =
    | ReturnType<typeof setIsRegisteredAC>
    | ReturnType<typeof setRegistrationLoadAC>
    | ReturnType<typeof setRegistrationErrorAC>


type ThunksDispatch = ThunkAction<Promise<void>, AppRootStateType, unknown, ActionsTypes>

type InitialStateType = {
    isRegistered: boolean
    registrationLoad: boolean
    registrationError: null | string
};







