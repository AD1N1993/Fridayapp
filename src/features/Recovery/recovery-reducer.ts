import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../../app/store";
import {authAPI} from "../../api/api";

const RECOVERY_SET_SHIPMENT = "RECOVERY_SET_SHIPMENT";
const RECOVERY_SHOW_ERROR = "RECOVERY_SHOW_ERROR";
const RECOVERY_SET_STATUS = "RECOVERY_SET_STATUS";


const initialState: InitialRecoveryStateType = {
    error: "",
    isShipment: false,
    isShowPreloader: false
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
        case RECOVERY_SET_STATUS:
            return {
                ...state, isShowPreloader: action.status
            }
        default:
            return {...state}
    }
}

//Action creators
const setIsShipment = (shipment: boolean) => ({type: RECOVERY_SET_SHIPMENT, shipment} as const);
const showError = (error: string) => ({type: RECOVERY_SHOW_ERROR, error} as const);
const setIsShowPreloader = (status: boolean) => ({type: RECOVERY_SET_STATUS, status} as const);

//Thunk creators
export const recoveryRequestTC = (email: string): ThunkType => {
    return async (dispatch) => {
        dispatch(setIsShowPreloader(true))
        try {
            await authAPI.forgotPassword(email);
            dispatch(setIsShipment(true));
            dispatch(setIsShowPreloader(false));
        } catch (error) {
            dispatch(showError(error.response.data.error));
            dispatch(setIsShowPreloader(false))
        }
    }
}

export const resetPasswordTC = (newPassword: string, token: string): ThunkType => {
    return async (dispatch) => {
        dispatch(setIsShowPreloader(true))
        try {
            await authAPI.setNewPassword(newPassword, token);
            dispatch(setIsShipment(true))
            dispatch(setIsShowPreloader(false))
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
    isShowPreloader: boolean
};

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

type ThunkType = ThunkAction<Promise<void>, AppRootStateType, unknown, ActionsTypes>


type ActionsTypes =
    | ReturnType<typeof setIsShipment>
    | ReturnType<typeof showError>
    | ReturnType<typeof setIsShowPreloader>