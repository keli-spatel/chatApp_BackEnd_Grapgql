import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Chat } from "./entities/chat.entity";
import { ChatService } from "./chat.service";
import { createUserDTO } from "../user/dto/createuser.input";
import { CurrentUser } from "src/common/decoretor/currentUser.decoretor";
import { TokenPayload } from "src/common/types/comman.types";
import { CreateChatDto } from "./DTO/createchat.dto";

@Resolver(() => Chat)
export class ChatResolver {
    constructor(
        private readonly chatService: ChatService
    ) {}

    @Mutation(() => Chat)
    async createChat(
        @Args('createUserDto')createChatDTO:CreateChatDto,
        @Args('userId')_id:string,
    ){
        return this.chatService.createChat(createUserDTO,_id)
    }
}