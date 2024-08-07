import { Injectable } from "@nestjs/common";
import { ChatRepository } from "../chat.repository";
import { UserService } from "src/module/user/user.service";
import { CreateMessageDto } from "./DTO/createMessage.DTO";
import { MessageDocument } from "./entities/message.document";
import { Types } from "mongoose";
import { Message } from "./entities/message.entity";

@Injectable()
export class MessageService{
    constructor(
        private readonly chatRepository:ChatRepository,
        private readonly userService:UserService
    ){}
    async createMessage({content, chatId}:CreateMessageDto, userId:string){
        const messageDocument:MessageDocument ={
            content,
            createdAt:new Date(),
            userId:new Types.ObjectId(userId),
            _id:new Types.ObjectId()
        }
        await this.chatRepository.findOneAndUpdate(
            {
                _id:chatId,

                $or:[
                    {userId},
                    {
                        userId:{
                            $in:[userId]
                        }
                    }
                ]

            },
            {
                $push:{
                    messages:messageDocument,
                }
            }
            
        );

        const message: Message = {
            ...messageDocument,
            chatId,
            user: await this.userService.findOne(userId),
          };
        
        // await this.pubSub.publish(MESSAGE_CREATED, {
        //     messageCreated: message
        // });
        return message
    
    }
}