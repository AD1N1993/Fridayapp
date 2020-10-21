import axios from "axios";


const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0"
})

export const authAPI = {
    forgotPassword(email: string) {
        return instance.post("/auth/forgot", {
            email,
            "from": "test-front-admin <ai73a@yandex.by>",
            "message": "<div style= 'background-color: #b8b8b8; padding: 15px'> " +
                "password recovery link: <a href='http://localhost:3000/Fridayapp#/initiate/$token$'> " +
                "Click the link to restore access to your account " +
                "</a>" +
                "</div>"
        })
    },
    setNewPassword(password:string,resetPasswordToken:string) {
        return instance.post("/auth/set-new-password",{password,resetPasswordToken})
    }

}
