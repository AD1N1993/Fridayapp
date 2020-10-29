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
    setNewPassword(password: string, resetPasswordToken: string) {
        return instance.post<{ info: string }>("/auth/set-new-password", {password, resetPasswordToken})
    },
    login(data: LoginParamsType) {
        return instance.post(`/auth/login`, data)
    },
    logout() {
        return instance.delete("/auth/me")
    },
    registered(data: RegistrationParamsType) {
        return  instance.post<RegistrationResponseType>('/auth/register', data)
    },
    me() {
        return instance.post('auth/me')
    }
}
export const PacksAPI = {
    getPacks(page: number = 1, pageCount: number = 4, min: number = 3, max: number = 9, sortPacks: string = '0update', user_id?: string) {
        return instance.get<GetPacksResponseType>(
            `/cards/pack?page=${page}&pageCount=${pageCount}&sotrPacks=${sortPacks}`
        )
    },
    postPack(cardsPack: PostPackParamsType) {
        return instance.post('/cards/pack', {cardsPack: cardsPack})
    },
    deletePack(packID: string) {
        return instance.delete(`/cards/pack?id=${packID}`)
    },
    putPack(cardsPack: PutPackParamsType) {
        return instance.put('/cards/pack', cardsPack)
    }
}
export const CardsAPI = {
    getCards(cardsPack_id: string, min: number = 1, max: number = 4, page: number = 1, pageCount: number = 7) {
        return instance.get<GetCardsResponseType>('/cards/card?' + cardsPack_id)
    },
    postCard(card: PostCardParamsType) {
        return instance.post('cards/card', card)
    },
    deleteCard(id: string) {
        return instance.delete('cards/card?' + id)
    },
    putCard(card: PutCardParamsType) {
        return instance.put('cards/card', card)
    }
}


//types
export type RegistrationParamsType = {
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
export type GetPacksResponseType = {
    cardPacks:Array<PackType>
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}
export type GetCardsResponseType = {
    cards: Array<CardType>
    page: number
    pageCount: number
    cardsTotalCount: number
    minGrade: number
    maxGrade: number
    token: string
    tokenDeathTime: number
}
export type PackType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
}
export type CardType = {
    _id: string
    cardsPack_id: string
    user_id: string
    answer: string
    question: string
    grade: number
    shots: number
    questionImg: string
    comments: string
    type: string
    rating: number
    more_id: string
    created: string
    updated: string
    __v: number
}
export type PostPackParamsType = {
    name: string
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
    private?: boolean
    type?: string
}
export type PutPackParamsType = {
    _id: string
    name?: string
}
export type PostCardParamsType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: 0 | 1 | 2 | 3 | 4 | 5
    shots?: number
    rating?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    type?: string
}
export type PutCardParamsType = {
    _id: string
    question?: string
    comments?: string
}

