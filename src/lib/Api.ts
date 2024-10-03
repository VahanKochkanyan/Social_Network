import axios from "axios";
import { IAccount, InputUser, IResponse, IUpdateLogin, IUpdatePassword, LoginUser } from "./types";

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


//Posts
export const handleGetPosts = async (): Promise<IResponse> => {
    const response = await Axios.get("/posts")
    return response.data
}


//PostCreation
export const handlePostCreation = async (data: FormData): Promise<IResponse> => {
    const response = await Axios.post("/posts", data)
    return response.data
}


//Search
export const handleSearch = async (text:string): Promise<IResponse> => {
    const response = await Axios.get("/search/" + text)
    return response.data
}


//Status
export const handleSetAccountStatus = async (): Promise<IResponse> => {
    const response = await Axios.patch("/account/set/")
    return response.data
}


//Account User
export const handleUsersPersonalPage = async (id: string): Promise<IAccount> => {
    const response = await Axios.get(`/account/${id}`)
    return response.data
}


//Send Follow
export const handleSendFollow = async (id: string): Promise<IResponse> => {
    const response = await Axios.post("/account/follow/" + id)
    return response.data
}


//Unfollow
export const handleUnfollow = async (id: string): Promise<IResponse> => {
    const response = await Axios.post("/account/unfollow/" + id)
    return response.data
}


//Request Cancel
export const handleCancelRequest = async (id: string): Promise<IResponse> => {
    const response = await Axios.delete("/request/cancel/" + id)
    return response.data
}


//Requests-Private Page
export const handleRequests = async (): Promise<IResponse> => {
    const response = await Axios.get("/requests")
    return response.data
}


//Accept
export const handleAcceptRequest = async (id:string): Promise<IResponse> => {
    const response = await Axios.patch("/requests/accept/" + id)
    return response.data
}


//Decline
export const handleDeclineRequest = async (id: string): Promise<IResponse> => {
    const response = await Axios.patch("/requests/decline/" + id)
    return response.data
}
