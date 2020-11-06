import {CardType} from "../../api/api";

const initialState: InitialStateType = {
    currentCard: null
}

export const learningProcessReducer = (state: InitialStateType = initialState, action: ActionsTypes):InitialStateType => {
    switch (action.type) {
        case "SET_CURRENT_CARD":
            return {
                ...state, currentCard: action.card
            }
        default:
            return state
    }
}

export const setCurrentCardAC = (card: CardType| null) => ({type: "SET_CURRENT_CARD", card} as const)

type ActionsTypes = ReturnType<typeof setCurrentCardAC>

export type InitialStateType = {
    currentCard: CardType | null
};