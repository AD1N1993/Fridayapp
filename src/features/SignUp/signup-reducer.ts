import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../../app/store";
import {authAPI, RegisteredParamsType} from "../../api/api";
import {setStatusAppAC} from "../../app/app-reducer";
import {Dispatch} from "redux";


const initialState: InitialStateType = {
    isRegistered: false,
    registrationError: null
}

export const signUpReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SET-IS-REGISTERED':
            return {...state, isRegistered: action.isRegistered}
        case "SET-REGISTRATION-ERROR":
            return {...state, registrationError: action.error}
        default:
            return state
    }
}

//Action creators
export const setIsRegisteredAC = (isRegistered: boolean) => ({type: 'SET-IS-REGISTERED', isRegistered} as const)
export const setRegistrationErrorAC = (error: null | string) => ({type: 'SET-REGISTRATION-ERROR', error} as const)


//Thunk creators
export const registrationTC = (data: RegisteredParamsType) => {
    return  (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(setStatusAppAC('loading'))
        authAPI.registered(data)
            .then( (res) => {
                dispatch(setIsRegisteredAC(true))
            })
            .catch( (error) => {
                dispatch(setRegistrationErrorAC(error.response.data.error))
                setTimeout(() => dispatch(setRegistrationErrorAC("")), 5000);
            })
            .finally( () => {
                dispatch(setStatusAppAC('succeeded'))
            })
    }
}

//types
type ActionsTypes =
    | ReturnType<typeof setIsRegisteredAC>
    | ReturnType<typeof setStatusAppAC>
    | ReturnType<typeof setRegistrationErrorAC>


type ThunksDispatch = ThunkAction<Promise<void>, AppRootStateType, unknown, ActionsTypes>

type InitialStateType = {
    isRegistered: boolean
    registrationError: null | string
};







