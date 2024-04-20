import { Injectable } from "@angular/core";
import { IUser } from "../core/models/auth.model";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { UserService } from "../core/services/user.service";
import { tap } from "rxjs";


export class GetAllUsers{
    static readonly type = '[User] Get All';
}
export class GetLoggedInUser{
    static readonly type = '[User] Get Logged In User';
}

export interface UserStateModel{
    users: IUser[] | undefined;
    user: IUser | undefined;
}

@State<UserStateModel>({
    name: 'User',
    defaults:{
        users: [],
        user: undefined
    }
})

@Injectable()
export class UserState{

    constructor(
        private userService: UserService
    ){

    }

    @Action(GetLoggedInUser)
    getLoggedInUser(ctx: StateContext<UserStateModel>){
        return this.userService.getLoggedInUser().pipe(
            tap((res)=>{
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    user: res.data
                })
            })
        )
    }

    @Action(GetAllUsers)
    getAllUsers(ctx: StateContext<UserStateModel>){

        return this.userService.getAllUsers().pipe(
            tap((res)=>{
                const state = ctx.getState()
                ctx.setState({
                    ...state,
                    users: res.data
                })
            })
        )

    }

    @Selector([UserState])
    static selectUsers(state: UserStateModel): IUser[] | undefined{
        return state.users;
    }

    @Selector([UserState])
    static selectUser(state: UserStateModel): IUser | undefined{
        return state.user;
    }

}