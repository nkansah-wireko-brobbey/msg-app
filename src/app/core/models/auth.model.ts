export interface IUser{
    _id: string;
    name: string;
    email: string;
    token?: string;
}

export interface Ilogin{
    email: string;
    password: string;
}

export interface ILoginResponse{
    message: string;
    token: string;
    data: IUser
}

export interface IRegister{
    email: string;
    password: string;
    name: string;
}

export interface IRegisterReponse{
    data: IUser;
    token?: string;
    message?: string
}