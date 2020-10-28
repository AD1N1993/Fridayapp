import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../../app/store";
import {authAPI} from "../../api/api";
import {setStatusAppAC} from "../../app/app-reducer";

const RECOVERY_SET_SHIPMENT = "RECOVERY_SET_SHIPMENT";
const RECOVERY_SHOW_ERROR = "RECOVERY_SHOW_ERROR";

const initialState: InitialRecoveryStateType = {
    error: "",
    isShipment: false,
}

export const recoveryReducer = (state: InitialRecoveryStateType = initialState, action: ActionsTypes): InitialRecoveryStateType => {
    switch (action.type) {
        case RECOVERY_SET_SHIPMENT:
            return {
                ...state, isShipment: action.shipment
            }
        case RECOVERY_SHOW_ERROR:
            return {
                ...state, error: action.error
            }
        default:
            return {...state}
    }
}

//Action creators
const setIsShipment = (shipment: boolean) => ({type: RECOVERY_SET_SHIPMENT, shipment} as const);
const showError = (error: string) => ({type: RECOVERY_SHOW_ERROR, error} as const);

//Thunk creators
export const recoveryRequestTC = (email: string): ThunkType => {
    return async (dispatch) => {
        dispatch(setStatusAppAC('loading'))
        try {
            await authAPI.forgotPassword(email);
            dispatch(setIsShipment(true));
            dispatch(setStatusAppAC('succeeded'))
        } catch (error) {
            dispatch(showError(error.response.data.error));
            dispatch(setStatusAppAC('succeeded'))
        }
    }
}

export const resetPasswordTC = (newPassword: string, token: string): ThunkType => {
    return async (dispatch) => {
        dispatch(setStatusAppAC('loading'))
        try {
            await authAPI.setNewPassword(newPassword, token);
            dispatch(setIsShipment(true))
            dispatch(setStatusAppAC('succeeded'))
        } catch (error) {
            dispatch(showError(error.response.data.error));
            setTimeout(() => dispatch(showError("")), 5000);
        }
    }
}

//types
export type InitialRecoveryStateType = {
    error: string
    isShipment: boolean
};

type ThunkType = ThunkAction<Promise<void>, AppRootStateType, unknown, ActionsTypes>

type ActionsTypes =
    | ReturnType<typeof setIsShipment>
    | ReturnType<typeof showError>
    | ReturnType<typeof setStatusAppAC>