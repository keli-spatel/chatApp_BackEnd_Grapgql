import { Injectable } from "@nestjs/common";
import { ChatRepository } from "./chat.repository";
import { UserService } from "../user/user.service";
import { CreateChatDto } from "./DTO/createchat.dto";

@Injectable()
export class ChatService{
    constructor(
        private readonly chatRepository: ChatRepository,
        private readonly userService: UserService
    ){}
    
    async createChat(createChatDto:CreateChatDto,userId:string){
        return this.chatRepository.create({
            ...createChatDto,
            userId,
            message:[]
        });
    }
}