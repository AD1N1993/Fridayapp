import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../../app/store";
import {authAPI} from "../../api/api";

const RECOVERY_SET_SHIPMENT = "RECOVERY_SET_SHIPMENT";
const RECOVERY_SHOW_ERROR = "RECOVERY_SHOW_ERROR";
const RECOVERY_SET_STATUS = "RECOVERY_SET_STATUS";


const initialState: InitialRecoveryStateType = {
    error: "",
    shipment: false,
    status: false
}

export const recoveryReducer = (state: InitialRecoveryStateType = initialState, action: ActionsTypes): InitialRecoveryStateType => {
    switch (action.type) {
        case RECOVERY_SET_SHIPMENT:
            return {
                ...state, shipment: action.shipment
            }
        case RECOVERY_SHOW_ERROR:
            return {
                ...state, error: action.error
            }
        case RECOVERY_SET_STATUS:
            return {
                ...state, status: action.status
            }
        default:
            return {...state}
    }
}

//Action creators
const setShipment = (shipment: boolean) => ({type: RECOVERY_SET_SHIPMENT, shipment} as const);
const showError = (error: string) => ({type: RECOVERY_SHOW_ERROR, error} as const);
const setStatus = (status: boolean) => ({type: RECOVERY_SET_STATUS, status} as const);

//Thunk creators
export const recoveryRequestTC = (email: string): ThunkType => {
    return async (dispatch) => {
        dispatch(setStatus(true))
        try {
            await authAPI.forgotPassword(email);
            dispatch(setShipment(true));
        } catch (error) {
            dispatch(showError(error.response.data.error));
        }
        dispatch(setStatus(false))
        dispatch(setShipment(false));
    }
}

export const resetPasswordTC = (newPassword: string, token: string): ThunkType => {
    return async (dispatch) => {
        dispatch(setStatus(true))
        try {
            await authAPI.setNewPassword(newPassword, token);
            dispatch(setShipment(true))
            dispatch(setStatus(false))
        } catch (error) {
            console.log(error.response.data.error);
        }
    }
}

//types
export type InitialRecoveryStateType = {
    error: string
    shipment: boolean
    status: boolean
};

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

type ThunkType = ThunkAction<Promise<void>, AppRootStateType, unknown, ActionsTypes>


type ActionsTypes =
    | ReturnType<typeof setShipment>
    | ReturnType<typeof showError>
    | ReturnType<typeof setStatus>