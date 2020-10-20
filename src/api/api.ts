import axios from "axios";

const settings = {
    withCredentials: true
}

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    ...settings
})

export const authAPI = {
    me() {

    },
    login(email: string, password: string, rememberMe: boolean = false) {

    },
    logout() {

    },
    registered(data: RegisteredParamsType) {
       return  instance.post<RegistrationResponseType>('/auth/register', data)
    }
}

//types
export type RegisteredParamsType = {
    email: string,
    password: string
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
