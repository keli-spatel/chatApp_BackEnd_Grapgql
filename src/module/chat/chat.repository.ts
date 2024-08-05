import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AbstractRepository } from "src/common/database/abstract.repository";
import { AbstractSchema } from "src/common/database/abstract.schema";
import { ChatDocument } from "./entities/chat.document";
import { Chat } from "./entities/chat.entity";

@Injectable()
export class ChatRepository extends AbstractRepository<AbstractSchema>{
    protected readonly logger = new Logger(ChatRepository.name);

    constructor(@InjectModel(Chat.name) chatModel : Model<ChatDocument>){
        super(chatModel)
    }
}