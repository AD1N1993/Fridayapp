import {PacksAPI, PackType, PostPackParamsType} from "../../api/api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {ThunkAction} from "redux-thunk";

const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_PACKS_TOTAL_COUNT = "SET_PACKS_TOTAL_COUNT";
const SET_PACKS_NAME = "SET_PACKS_NAME";
const SET_PAGE_SIZE = "SET_PAGE_SIZE";
const SET_MIN_MAX_VALUE = "SET_MIN_MAX_VALUE";
const SET_UPDATE_PACKS = "SET_UPDATE_PACKS";

export enum SortType {
    new = 0,
    old = 1
}


const initialState: InitialStateType = {
    packs: [ {
        "_id": "5f9931cda8ecd80004251062",
        "user_id": "5f8db5f8af26d91404fa17ef",
        "user_name": "osbelkz@gmail.com",
        "private": false,
        "name": "English",
        "path": "/def",
        "grade": 0,
        "shots": 0,
        "cardsCount": 0,
        "type": "pack",
        "rating": 0,
        "created": "2020-10-28T08:54:37.697Z",
        "updated": "2020-10-28T08:54:37.697Z",
        "more_id": "5f8db5f8af26d91404fa17ef",
        "__v": 0
    },
        {
            "_id": "5f9886bff287e40004436f77",
            "user_id": "5eecf82a3ed8f700042f1186",
            "user_name": "nya",
            "private": false,
            "name": "REACT",
            "path": "/def",
            "grade": 0,
            "shots": 0,
            "cardsCount": 0,
            "type": "pack",
            "rating": 0,
            "created": "2020-10-27T20:44:47.261Z",
            "updated": "2020-10-27T20:44:47.261Z",
            "more_id": "5eecf82a3ed8f700042f1186",
            "__v": 0
        },
        {
            "_id": "5f9879dbf287e40004436f75",
            "user_id": "5eecf82a3ed8f700042f1186",
            "user_name": "nya",
            "private": false,
            "name": "JavaScript",
            "path": "/def",
            "grade": 0,
            "shots": 0,
            "cardsCount": 1,
            "type": "pack",
            "rating": 0,
            "created": "2020-10-27T19:49:47.361Z",
            "updated": "2020-10-27T19:50:04.938Z",
            "more_id": "5eecf82a3ed8f700042f1186",
            "__v": 0
        },
        {
            "_id": "5f9869f70c8c97231cd9b9a5",
            "user_id": "5f9047988fe3a00004400991",
            "user_name": "alekseidarafeichyk@gmail.com",
            "private": false,
            "name": "TypeScript",
            "path": "/def",
            "grade": 0,
            "shots": 0,
            "cardsCount": 0,
            "type": "pack",
            "rating": 0,
            "created": "2020-10-27T18:41:59.093Z",
            "updated": "2020-10-27T18:41:59.093Z",
            "more_id": "5f9047988fe3a00004400991",
            "__v": 0
        }],
    pageSize: "12",
    totalPacksCount: 0,
    currentPage: 1,
    isFetching: false,
    findPackName: "",
    min: 0,
    max: 20,
    update: SortType.new

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
export const setUpdatePacksAC = (value: SortType) => ({type: SET_UPDATE_PACKS, value} as const)
export const setCurrentPageAC = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const)
export const setPacksAC = (packs: Array<PackType>) => ({type: 'SET-PACKS', packs} as const)
export const removePackAC = (packID: string) => ({type: 'REMOVE-PACK', packID} as const)
export const createPackAC = (newPack: PackType) => ({type: 'CREATE-PACK', newPack} as const)


//Thunk creators
export const getPacksTC = (currentPage: any, pageSize: any, packName?: string, min?: string, max?: string,
                           update?: string) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        PacksAPI.getPacks(currentPage, pageSize)
            .then((res) => {
                dispatch(setPacksAC(res.data.cardPacks))
            })
    }
}
export const removePackTC = (packID: string) => {
    return (dispatch: Dispatch<any>) => {
        PacksAPI.deletePack(packID)
            .then((res) => {
                dispatch(getPacksTC(initialState.currentPage, initialState.pageSize ))
            })
    }
}
export const createPackTC = (packName: string) => {
    debugger
    const newPack: PostPackParamsType = {name: packName}
    return (dispatch: Dispatch<any>)  => {
        PacksAPI.postPack(newPack)
            .then( (res) => {
                dispatch(getPacksTC(initialState.currentPage, initialState.pageSize ))
                debugger
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

type ThunkType = ThunkAction<Promise<void>, AppRootStateType, unknown, ActionsTypes>

type InitialStateType = {
    packs: Array<PackType>
    pageSize: any
    totalPacksCount: number
    currentPage: number
    isFetching: boolean
    findPackName: string
    min: number
    max: number
    update: SortType
}








