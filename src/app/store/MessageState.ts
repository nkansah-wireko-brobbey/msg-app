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

export interface MessageStateModel{
    messages: IMessage[] | undefined
}

@State<MessageStateModel>({
    name: 'Message',
    defaults:{
        messages:[]
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

    @Selector([MessageState])
    static selectMessages(state: MessageStateModel):IMessage[] | undefined{
        return state.messages;
    }



}