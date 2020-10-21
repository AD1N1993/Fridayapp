import axios from "axios";
import {LoginParamsType} from "../features/Login/auth-reducer";

const settings = {
    withCredentials: true
}


const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0",
    ...settings
})

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post(`/auth/login`, data)
    }
}

//nya-admin@nya.nya
//1qazxcvBG
