export interface IUser{
    _id: string;
    name: string;
    email: string;
}

export interface Ilogin{
    email: string;
    password: string;
}

export interface ILoginResponse{
    message: string;
    token: string;
    user: IUser
}