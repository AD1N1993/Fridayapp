import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../../app/store";
import {Dispatch} from "redux";
import {authAPI} from "../../api/api";


const initialState = {
    isLoggedIn: false,
    error: '',
    status: 'idle' as RequestStatusType
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SET_IS_LOGGED":
            return {...state, isLoggedIn: action.value}
        case "SET_LOGIN_ERROR":
            return {...state, error: action.error}
        case "SET_STATUS":
            return {...state, status: action.status}
        default:
            return state
    }
}

//Action creators
export const setIsLoggedAC = (value: boolean) =>
    ({type: "SET_IS_LOGGED", value} as const)

export const setLoginErrorAC = (error: string) =>
    ({type: "SET_LOGIN_ERROR", error} as const)

export const setStatusAC = (status: RequestStatusType) =>
    ({type: "SET_STATUS", status} as const)

//Thunk creators
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(setStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            if (res.status === 200) {
                dispatch(setIsLoggedAC(true))
            }
        })
        .catch((e) => {
            const error = e.response.data.error
            dispatch(setLoginErrorAC(error))
            setTimeout(() => dispatch(setLoginErrorAC("")), 5000);

        })
        .finally(() => {
                dispatch(setStatusAC('succeeded'))
            }
        )
}

export const logoutTC = () => (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(setStatusAC('loading'))
    authAPI.logout()
        .then((res) => {
            if (res.status === 200) {
                dispatch(setIsLoggedAC(false))
            }
        })
        .finally(() => {
            dispatch(setStatusAC('succeeded'))
        })
}

//types
type InitialStateType = typeof initialState;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

// type ThunkType = ThunkAction<Promise<void>, AppRootStateType, unknown, ActionsTypes>
export type SetIsLoggedType = ReturnType<typeof setIsLoggedAC>
type ActionsTypes =
    SetIsLoggedType |
    ReturnType<typeof setLoginErrorAC> |
    ReturnType<typeof setStatusAC>

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}