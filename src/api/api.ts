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
    forgotPassword(email: string) {
        return instance.post<ForgotPasswordResponseType>("/auth/forgot", {
            email,
            "from": "test-front-admin <ai73a@yandex.by>",
            "message": "<div style= 'background-color: #b8b8b8; padding: 15px'> " +
                "password recovery link: <a href='https://ad1n1993.github.io/Fridayapp/#/initiate/$token$'> " +
                "Click the link to restore access to your account " +
                "</a>" +
                "</div>"
        })
    },
    setNewPassword(password:string,resetPasswordToken:string) {
        return instance.post<{info:string}>("/auth/set-new-password",{password,resetPasswordToken})
    },
    login(data: LoginParamsType) {
        return instance.post(`/auth/login`, data)
    },
    logout() {
        return instance.delete("/auth/me")
    },
    registered(data: RegisteredParamsType) {
        return  instance.post<RegistrationResponseType>('/auth/register', data)
    },
    me() {
        return instance.post('auth/me')
    }
}
export const PacksAPI = {

}
export const CardsAPI = {

}

//nya-admin@nya.nya
//1qazxcvBG


//types
export type RegisteredParamsType = {
    email: string,
    password: string
}
export type  ForgotPasswordResponseType = {
    "info": string,
    "success": boolean,
    "answer": boolean,
    "html": boolean
}
export type RegistrationResponseType = {
    addedUser: {
        created: string
        email: string
        isAdmin: boolean
        name: string
        publicCardPacksCount: number
        rememberMe: boolean
        updated: string
        verified: boolean
        __v: number
        _id: string
    }
}