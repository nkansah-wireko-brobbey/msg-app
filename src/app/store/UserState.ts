import { Injectable } from "@angular/core";
import { IUser } from "../core/models/auth.model";
import { Action, State, StateContext } from "@ngxs/store";
import { UserService } from "../core/services/user.service";
import { tap } from "rxjs";


export class GetAllUsers{
    static readonly type = '[User] Get All';
}

export interface UserStateModel{
    users: IUser[] | undefined
}

@State<UserStateModel>({
    name: 'User',
    defaults:{
        users: []
    }
})

@Injectable()
export class UserState{

    constructor(
        private userService: UserService
    ){

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

}