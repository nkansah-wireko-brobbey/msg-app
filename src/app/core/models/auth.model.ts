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