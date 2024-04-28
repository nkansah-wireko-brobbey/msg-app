import { Action, Selector, State, StateContext } from "@ngxs/store";
import { IMessage } from "../core/models/common.model";
import { Injectable } from "@angular/core";
import { MessageService } from "../core/services/message.service";
import { tap } from "rxjs";
import { SocketService } from "../core/services/socket.service";

export class GetAllMessages{
    static readonly type = '[Message] Get All';
}

export class GetNewMessage{
    static readonly type = '[Message] Get New';
}

export class GetMessage{
    static readonly type = '[Message] Get';
    constructor(public id: string){}
}

export class ResetMessage{
    static readonly type = '[Message] Reset';
}

export interface MessageStateModel{
    messages: IMessage[] | undefined,
    message: IMessage | undefined
}

@State<MessageStateModel>({
    name: 'Message',
    defaults:{
        messages:[],
        message: undefined
    }
})

@Injectable()
export class MessageState{

    constructor(private messageService: MessageService,private socket: SocketService){

    }

    @Action(GetAllMessages)
    getAllMessage(ctx: StateContext<MessageStateModel>){

        return this.messageService.getAllMessages()
        .pipe(
            tap((res)=>{
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    messages: res.data
                })

            })
        )

    }

    @Action(GetNewMessage)
    getNewMessage(ctx: StateContext<MessageStateModel>){

        return this.socket.newMesages()
            .pipe(
                tap((res)=>{
                    if(!res){
                        return;
                    }
                    const state = ctx.getState();
                    ctx.setState({
                        ...state,
                        messages: [...(state.messages || []), res]
                    })
                })
            )

    }
    @Action(GetMessage)
    getMessage(ctx: StateContext<MessageStateModel>, action: GetMessage){

        return this.messageService.getMessage(action.id).pipe(
            tap((res)=>{
                console.log(res)
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    message: res.data
                })
            })

        )
    }

    @Action(ResetMessage)
    resetMessage(ctx: StateContext<MessageStateModel>){
        const state = ctx.getState();
        ctx.setState({
            ...state,
            message: undefined
        })
    }

    @Selector([MessageState])
    static selectMessages(state: MessageStateModel):IMessage[] | undefined{
        return state.messages;
    }

    @Selector([MessageState])
    static selectMessage(state: MessageStateModel):IMessage | undefined{
        return state.message;
    }


}