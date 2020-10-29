import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../../app/store";
import {RegistrationParamsType} from "../../api/api";


const initialState = {
    cards: [],
    pageSize: 5,
    totalCardsCount: 0,
    currentPage: 1,
    isFetching: false
}

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {

        default:
            return state
    }
}

//Action creators
export const setIsRegisteredAC = (isRegistered: boolean) => ({type: 'SET-IS-REGISTERED', isRegistered} as const)


//Thunk creators
export const registrationTC = (data: RegistrationParamsType) => {
    return (dispatch: any) => {

    }
}

//types
type ActionsTypes =
    | ReturnType<typeof setIsRegisteredAC>


type ThunksDispatch = ThunkAction<Promise<void>, AppRootStateType, unknown, ActionsTypes>

type InitialStateType = {};







