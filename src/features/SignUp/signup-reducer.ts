import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../../app/store";


const initialState: InitialStateType = () => {

}

export const signupReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action) {
        default:
            return {...state}
    }
}

//Action creators


//Thunk creators
export const initializedAppTC = ():ThunkType =>{
    return async (dispatch)=>{

    }
}

//types
type InitialStateType = {};

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

type ThunkType = ThunkAction<Promise<void>, AppRootStateType, unknown, ActionsTypes>



type ActionsTypes = any