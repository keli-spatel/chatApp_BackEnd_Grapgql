import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { MessageService } from "./message.service";
import { Message } from "./entities/message.entity";
import { CreateMessageDto } from "./DTO/createMessage.DTO";

@Resolver()
export class MessageResolver {
    constructor(private readonly messageService:MessageService){}

    @Mutation(() => Message)
    async createMessage(
        @Args('createMessageDto') createMessageDto:CreateMessageDto,
        @Args('userId') userId: string
    ){
        return this.messageService.createMessage(createMessageDto,userId)
    }

}