import axios from "axios";
import { InputUser, IResponse, IUpdateLogin, IUpdatePassword, LoginUser } from "./types";

const Axios = axios.create({
    baseURL: "http://localhost:4002",
    withCredentials: true
})


//SignUp
export const handleSignup = async (user: InputUser): Promise<IResponse> => {
    const response = await Axios.post('/signup', user)
    return response.data
}


//Login
export const handleLogin = async (user: LoginUser): Promise<IResponse> => {
    const response = await Axios.post('/login', user)
    return response.data
}


//Verify
export const handleVerify = async ():Promise<IResponse> => {
    const response = await Axios.get("/verify")
    return response.data;
}


//Logout
export const handleLogout = async (): Promise<IResponse> => {
    const response = await Axios.post("/logout")
    return response.data
}


//Update_Password
export const handleUpdatePassword = async (password:IUpdatePassword):Promise<IResponse> => {
    const response = await Axios.patch("/update/password",password)
    return response.data
}


//Update_Login
export const handleUpdateLogin = async (login: IUpdateLogin): Promise<IResponse> => {
    const response = await Axios.patch("/update/login",login)
    return response.data
}


//Picture
export const handlePictureUpload = async (data: FormData): Promise<IResponse> => {
    const response = await Axios.patch("/profile/upload", data)
    return response.data
}


//Cover
export const handleCoverUpload = async (data: FormData): Promise<IResponse> => {
    const response = await Axios.patch("/cover/upload", data)
    return response.data
}