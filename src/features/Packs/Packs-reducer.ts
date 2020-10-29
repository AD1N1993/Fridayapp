import {PacksAPI, PackType, PostPackParamsType} from "../../api/api";
import {Dispatch} from "redux";


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
    pageSize: 12,
    totalPacksCount: 0,
    currentPage: 1,
    isFetching: false
}

export const packsReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
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
export const setPacksAC = (packs: Array<PackType>) => ({type: 'SET-PACKS', packs} as const)
export const removePackAC = (packID: string) => ({type: 'REMOVE-PACK', packID} as const)
export const createPackAC = (newPack: PackType) => ({type: 'CREATE-PACK', newPack} as const)


//Thunk creators
export const getPacksTC = (page: number, pageCount: number) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        PacksAPI.getPacks(page, pageCount)
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
            })
    }
}

//types
type ActionsTypes =
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof removePackAC>
    | ReturnType<typeof createPackAC>

type InitialStateType = {
    packs: Array<PackType>
    pageSize: number
    totalPacksCount: number
    currentPage: number
    isFetching: boolean
}


//type ThunksDispatch = ThunkAction<Promise<void>, AppRootStateType, unknown, ActionsTypes>








