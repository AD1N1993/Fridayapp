import {Dispatch} from "redux";
import {authAPI} from "../../api/api";
import {setMyUserIdAC, setStatusAppAC, SetUserId} from "../../app/app-reducer";


const initialState = {
    isLoggedIn: false,
    error: '',
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SET_IS_LOGGED":
            return {...state, isLoggedIn: action.value}
        case "SET_LOGIN_ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

//Action creators
export const setIsLoggedAC = (value: boolean) =>
    ({type: "SET_IS_LOGGED", value} as const)

export const setLoginErrorAC = (error: string) =>
    ({type: "SET_LOGIN_ERROR", error} as const)


//Thunk creators
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(setStatusAppAC('loading'))
    authAPI.login(data)
        .then((res) => {
            if (res.statusText === "OK") {
                dispatch(setIsLoggedAC(true))
                dispatch(setMyUserIdAC(res.data._id))
            }
        })
        .catch((e) => {
            const error = e.response.data.error
            dispatch(setLoginErrorAC(error))
            setTimeout(() => dispatch(setLoginErrorAC("")), 5000);

        })
        .finally(() => {
                dispatch(setStatusAppAC('succeeded'))
            }
        )
}

export const logoutTC = () => (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(setStatusAppAC('loading'))
    authAPI.logout()
        .then((res) => {
            if (res.statusText === "OK") {
                dispatch(setIsLoggedAC(false))
                dispatch(setMyUserIdAC(res.data._id))
            }
        })
        .finally(() => {
            dispatch(setStatusAppAC('succeeded'))
        })
}

//types
type InitialStateType = typeof initialState;

export type SetIsLoggedType = ReturnType<typeof setIsLoggedAC>
type ActionsTypes =
    SetIsLoggedType |
    ReturnType<typeof setLoginErrorAC> |
    ReturnType<typeof setStatusAppAC> | SetUserId

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}