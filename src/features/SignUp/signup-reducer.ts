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
export const initializedAppTC = ():ThunksType =>{
    return async (dispatch)=>{

    }
}

//types
type InitialStateType = {};



type ThunksType = ThunkAction<Promise<void>, AppRootStateType, unknown, ActionsTypes>



type ActionsTypes = any