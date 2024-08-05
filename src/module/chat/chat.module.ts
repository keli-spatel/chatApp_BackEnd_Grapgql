import { forwardRef, Module } from "@nestjs/common";
import { DatabaseModule } from "src/common/database/databasse.module";
import { ChatSchema } from "./entities/chat.document";
import { Chat } from "./entities/chat.entity";
import { UserModule } from "../user/user.module";
import { ChatRepository } from "./chat.repository";
import { ChatService } from "./chat.service";
import { ChatResolver } from "./chat.resolver";

@Module({
    imports: [DatabaseModule.forFeature([
        {
            name: Chat.name,
            schema: ChatSchema
        },
    ]),
    forwardRef(() => UserModule),
    ],

    providers: [ChatRepository, ChatService, ChatResolver],
    exports: [ChatRepository]
})
export class Chatmodule { }


