import {CardsAPI, CardType, PacksAPI, PostPackParamsType} from "../../api/api";
import {Dispatch} from "redux";
import {setStatusAppAC} from "../../app/app-reducer";

const SET_CURRENT_CARD = "SET_CURRENT_CARD";
const SET_CURRENT_CARD_RATE = "SET_CURRENT_CARD_RATE"
const initialState: InitialStateType = {
    currentCard: null,
    rate: 4
}

export const learningProcessReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_CURRENT_CARD:
            return {
                ...state, currentCard: action.card
            }
        case SET_CURRENT_CARD_RATE:
            return {
                ...state, rate: action.rate
            }
        default:
            return state
    }
}

export const setCurrentCardAC = (card: CardType | null) => ({type: SET_CURRENT_CARD, card} as const)
export const setCurrentCardRateAC = (rate: number) => ({type: SET_CURRENT_CARD_RATE, rate} as const)

export const setRateThunk = (currentCardId: string,rate:number) => {
    return (dispatch: Dispatch<any>)  => {
        dispatch(setStatusAppAC("loading"))
        CardsAPI.gradeCard(currentCardId,rate)
            .then( (res) => {
                debugger
                dispatch(setCurrentCardRateAC(res.data.updatedGrade.grade))
                dispatch(setStatusAppAC("succeeded"))
            })
    }
}

type ActionsTypes =
    | ReturnType<typeof setCurrentCardAC>
    | ReturnType<typeof setCurrentCardRateAC>

export type InitialStateType = {
    currentCard: CardType | null,
    rate: number
};