export interface IUser {
    id: string
    name: string
    surname: string
    login: string
    password: string
    isPrivate: boolean
    cover: string
    picture: string

}

export type InputUser = Omit<IUser, 'id' | 'isPrivate' | 'cover' | 'picture'>

export type LoginUser = Omit<IUser, 'id' | 'isPrivate' | 'cover' | 'picture' | 'name' | 'surname'>

export interface IResponse {
    status: string
    message?: string
    payload?: unknown
    user?: IWideUser
}

export interface IWideUser extends IUser {
    followers: IUser[]
    following: IUser[]
}

export interface IContextType {
    account: IWideUser
    setAccount: (user: IWideUser) => void
}

export interface IUpdatePassword {
    old: string
    newpwd: string
}

export interface IUpdateLogin{
    password:string
    login:string
}


export interface IPosts {
    id: number
    title: string
    picture: string
}


export interface IAccount extends IUser {
    followers: IUser[]
    following: IUser[]
    payload?: unknown

}


export interface IUserStatus {
    isPrivate: boolean;
}

export interface IAccount extends IUser {
    posts?: IPosts[]

    available: boolean

    connection: {
    blockedMe: boolean
    didIBlock: boolean
    following: boolean
    followsMe: boolean
    requested: boolean
  }
}
