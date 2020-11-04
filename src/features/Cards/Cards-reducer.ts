import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../../app/store";
import {CardsAPI, CardType, PostCardParamsType} from "../../api/api";
import {SetStatusApp, setStatusAppAC} from "../../app/app-reducer";
import {setCardPacksTotalCountAC, SetCardPacksTotalCountActionType, SetCurrentPageAC} from "../Packs/Packs-reducer";
import {Dispatch} from "redux";

const SET_CURRENT_CARD_PAGE = "SET_CURRENT_CARD_PAGE";
const SET_PACKS_TOTAL_COUNT = "SET_PACKS_TOTAL_COUNT";
const SET_PAGE_SIZE = "SET_PAGE_SIZE";

const initialState: InitialStateType = {
    cards: [],
    pageSize: 5,
    totalCardsCount: 0,
    currentPage: 1,
    currentPackID: "",
    isFetching: false
}
export type InitialStateType = {
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
        case SET_CURRENT_CARD_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_PACKS_TOTAL_COUNT:
            return {
                ...state, totalCardsCount: action.count
            }
        // case SET_PAGE_SIZE:
        //     return {
        //         ...state, pageSize: action.pageSize
        //     }
        default:
            return state
    }
}

//Action creators
export const setCardsAC = (cards: Array<CardType>) => ({type: 'SET_CARDS', cards} as const)
export const setCurrentPackIdAC = (packID: string) => ({type: 'SET_CURRENT_PACK_ID', packID} as const)
export const setCurrentCardPageAC = (currentPage: number) => ({type: SET_CURRENT_CARD_PAGE, currentPage} as const)


//Thunk creators
export const getCardsTC = (cardsPack_id: string,currentPage?:number) => {
    return (dispatch: Dispatch<any>) => {
        dispatch(setStatusAppAC('loading'))
        CardsAPI.getCards(cardsPack_id,"",currentPage)
            .then((res) => {
                dispatch(setCardsAC(res.data.cards))
                dispatch(setCardPacksTotalCountAC(res.data.cardsTotalCount))
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
    | ReturnType<typeof setCurrentCardPageAC>



type ThunksDispatch = ThunkAction<Promise<void>, AppRootStateType, unknown, ActionsTypes>









