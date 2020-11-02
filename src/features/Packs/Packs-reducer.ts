import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {ThunkAction} from "redux-thunk";
import {SetStatusApp, setStatusAppAC} from "../../app/app-reducer";
import {PacksAPI, PackType, PostPackParamsType} from "../../api/api";

const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_PACKS_TOTAL_COUNT = "SET_PACKS_TOTAL_COUNT";
const SET_PACKS_NAME = "SET_PACKS_NAME";
const SET_PAGE_SIZE = "SET_PAGE_SIZE";
const SET_MIN_MAX_VALUE = "SET_MIN_MAX_VALUE";
const SET_UPDATE_PACKS = "SET_UPDATE_PACKS";

export enum SortType {
    Z = 0,
    A = 1
}
const initialState: InitialStateType = {
    packs: [],
    pageSize: "6",
    totalPacksCount: 0,
    currentPage: 1,
    isFetching: false,
    findPackName: "",
    min: 0,
    max: 20,
    update: "0update"
}


export const packsReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
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
        case "SET-PACKS":
            return {...state, packs: [...action.packs]}
        case "REMOVE-PACK":
            return {...state, packs: state.packs.filter(i => i._id !== action.packID)}
        case "CREATE-PACK":
            return {...state, packs: [action.newPack, ...state.packs]}
        default:
            return state
    }
}

//Action creators
export const setCardPacksTotalCountAC = (count: number) => ({type: SET_PACKS_TOTAL_COUNT, count} as const)
export const setPacksNameAC = (packName: string) => ({type: SET_PACKS_NAME, packName} as const)
export const setPageSizeAC = (pageSize: string) => ({type: SET_PAGE_SIZE, pageSize} as const)
export const setMinMaxValueAC = (value: Array<number>) => ({type: SET_MIN_MAX_VALUE, value} as const)
export const setUpdatePacksAC = (value: string) => ({type: SET_UPDATE_PACKS, value} as const)
export const setCurrentPageAC = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const)
export const setPacksAC = (packs: Array<PackType>) => ({type: 'SET-PACKS', packs} as const)
export const removePackAC = (packID: string) => ({type: 'REMOVE-PACK', packID} as const)
export const createPackAC = (newPack: PackType) => ({type: 'CREATE-PACK', newPack} as const)

//Thunk creators
export const getPacksTC = (packName?:string,min?: number, max?: number, sortPacks?: string,page?: number, pageCount?: number,  user_id?: string,) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(setStatusAppAC("loading"))
        PacksAPI.getPacks(packName, min,max,sortPacks,page,pageCount,)
            .then((res) => {
                dispatch(setPacksAC(res.data.cardPacks))
                dispatch(setCardPacksTotalCountAC(res.data.cardPacksTotalCount))
                dispatch(setStatusAppAC("succeeded"))
            })
    }
}
export const removePackTC = (packID: string) => {
    return (dispatch: Dispatch<any>) => {
        dispatch(setStatusAppAC("loading"))
        PacksAPI.deletePack(packID)
            .then((res) => {
                dispatch(getPacksTC())
                dispatch(setStatusAppAC("succeeded"))
            })
    }
}
export const createPackTC = (packName: string) => {
    const newPack: PostPackParamsType = {name: packName}
    return (dispatch: Dispatch<any>)  => {
        dispatch(setStatusAppAC("loading"))
        PacksAPI.postPack(newPack)
            .then( (res) => {
                dispatch(getPacksTC())
                dispatch(setStatusAppAC("succeeded"))
            })
    }
}

//types
type ActionsTypes =
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof removePackAC>
    | ReturnType<typeof createPackAC>
    | ReturnType<typeof setCardPacksTotalCountAC>
    | ReturnType<typeof setPacksNameAC>
    | ReturnType<typeof setPageSizeAC>
    | ReturnType<typeof setMinMaxValueAC>
    | ReturnType<typeof setUpdatePacksAC>
    | SetStatusApp
    | SetCardPacksTotalCountActionType

export type SetCardPacksTotalCountActionType =  ReturnType<typeof setCardPacksTotalCountAC>

type ThunkType = ThunkAction<Promise<void>, AppRootStateType, unknown, ActionsTypes>

export type InitialStateType = {
    packs: Array<PackType>
    pageSize: any
    totalPacksCount: number
    currentPage: number
    isFetching: boolean
    findPackName: string
    min: number
    max: number
    update: string
}








