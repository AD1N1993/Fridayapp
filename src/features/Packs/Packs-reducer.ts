import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../../app/store";
import {PacksAPI} from "../../api/api"

const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_PACKS = "SET_PACKS";
const SET_PACKS_TOTAL_COUNT = "SET_PACKS_TOTAL_COUNT";
const SET_PACKS_NAME = "SET_PACKS_NAME";
const SET_PAGE_SIZE = "SET_PAGE_SIZE";
const SET_MIN_MAX_VALUE = "SET_MIN_MAX_VALUE";
const SET_UPDATE_PACKS = "SET_UPDATE_PACKS";

export enum SortType {
    new = 0,
    old = 1
}


const initialState = {
    packs: [],
    pageSize: "5",
    totalPacksCount: 0,
    currentPage: 1,
    isFetching: false,
    findPackName: "",
    min: 0,
    max: 20,
    update: SortType.new

}

export const PacksReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_PACKS:
            return {
                ...state, packs: action.packs
            }
        case SET_PACKS_TOTAL_COUNT:
            return {
                ...state, totalPacksCount: action.count
            }
        case SET_PACKS_NAME:
            return {...state, findPackName: action.packName}
        case SET_PAGE_SIZE:
            return {
                ...state, pageSize: action.pageSize
            }
        case  SET_MIN_MAX_VALUE:
            return {
                ...state, min: action.value[0], max: action.value[1]
            }
        case SET_UPDATE_PACKS:
            return {
                ...state, update:action.value
            }

        default:
            return state
    }
}

//Action creators
export const setIsRegisteredAC = (isRegistered: boolean) => ({type: 'SET-IS-REGISTERED', isRegistered} as const)
export const setCurrentPageAC = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const)
export const setPacksAC = (packs: Array<PackType>) => ({type: SET_PACKS, packs} as const)
export const setCardPacksTotalCountAC = (count: number) => ({type: SET_PACKS_TOTAL_COUNT, count} as const)
export const setPacksNameAC = (packName: string) => ({type: SET_PACKS_NAME, packName} as const)
export const setPageSizeAC = (pageSize: string) => ({type: SET_PAGE_SIZE, pageSize} as const)
export const setMinMaxValueAC = (value: Array<number>) => ({type: SET_MIN_MAX_VALUE, value} as const)
export const setUpdatePacksAC = (value: SortType) => ({type: SET_UPDATE_PACKS, value} as const)


//Thunk creators
export const getPacksTC = (packName?: string, min?: string, max?: string, sortPacks?: string, page?: string, pageCount?: string, user_id?: string): ThunkType => {
    return async (dispatch) => {

        try {
            let data = await PacksAPI.getPacks(packName, min, max, sortPacks, page, pageCount, user_id);
            dispatch(setPacksAC(data.data.cardPacks))
            dispatch(setCardPacksTotalCountAC(data.data.cardPacksTotalCount))
        } catch (error) {

        }
    }
}

//types
type ActionsTypes =
    | ReturnType<typeof setIsRegisteredAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof setCardPacksTotalCountAC>
    | ReturnType<typeof setPacksNameAC>
    | ReturnType<typeof setPageSizeAC>
    | ReturnType<typeof setMinMaxValueAC>
    | ReturnType<typeof setUpdatePacksAC>


type ThunkType = ThunkAction<Promise<void>, AppRootStateType, unknown, ActionsTypes>
type InitialStateType = {
    packs: Array<PackType>,
    pageSize: string,
    totalPacksCount: number,
    currentPage: number,
    isFetching: boolean
    findPackName: string
    min: number
    max: number
    update: SortType
};
export type PackType = {
    "_id": string
    "user_id": string
    "user_name": string
    "private": boolean
    "name": string
    "path": string
    "grade": number
    "shots": number
    "cardsCount": number
    "type": string
    "rating": number
    "created": string
    "updated": string
    "more_id": string
    "__v": number
}







