import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../../app/store";
import {CardsAPI, CardType, PostCardParamsType} from "../../api/api";
import {SetStatusApp, setStatusAppAC} from "../../app/app-reducer";
import {SetCardPacksTotalCountActionType} from "../Packs/Packs-reducer";
import {Dispatch} from "redux";


const initialState: InitialStateType = {
    cards: [],
    pageSize: 5,
    totalCardsCount: 0,
    currentPage: 1,
    currentPackID: "",
    isFetching: false
}
type InitialStateType = {
    cards: Array<CardType>
    pageSize: number
    totalCardsCount: number
    currentPage: number
    isFetching: boolean
    currentPackID: string
};

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_CARDS':
            return {...state, cards:[ ...action.cards]}
        case 'SET_CURRENT_PACK_ID':
            return {...state, currentPackID: action.packID}
        default:
            return state
    }
}

//Action creators
export const setCardsAC = (cards: Array<CardType>) => ({type: 'SET_CARDS', cards} as const)
export const setCurrentPackIdAC = (packID: string) => ({type: 'SET_CURRENT_PACK_ID', packID} as const)


//Thunk creators
export const getCardsTC = (cardsPack_id: string) => {
    debugger
    return (dispatch: Dispatch<any>) => {
        dispatch(setStatusAppAC('loading'))
        CardsAPI.getCards(cardsPack_id)
            .then((res) => {
                debugger
                dispatch(setCardsAC(res.data.cards))
                dispatch(setStatusAppAC('succeeded'))
            })

    }
}
export const deleteCard = (cardID: string, packID: string) => {
    return (dispatch: Dispatch<any>) => {
        CardsAPI.deleteCard(cardID)
            .then((res) => {
                dispatch(getCardsTC(packID))
            })
    }
}
export const createCard = (card: PostCardParamsType, packID: string) => {
    return (dispatch: Dispatch<any>) => {
        CardsAPI.postCard(card)
            .then((res) => {
                dispatch(getCardsTC(packID))
            })
    }
}

//types
type ActionsTypes =
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof setCurrentPackIdAC>
    | SetCardPacksTotalCountActionType
    | SetStatusApp


type ThunksDispatch = ThunkAction<Promise<void>, AppRootStateType, unknown, ActionsTypes>









