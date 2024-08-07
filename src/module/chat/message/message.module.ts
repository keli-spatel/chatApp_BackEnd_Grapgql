import { forwardRef, Module } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageResolver } from "./message.resolver";
import { Chatmodule } from "../chat.module";
import { UserService } from "src/module/user/user.service";
import { UserModule } from "src/module/user/user.module";

@Module({
    imports:[
        forwardRef(() => Chatmodule),
        forwardRef(() => UserModule)
    ],
    providers:[
    MessageService,
    MessageResolver
    ],
    exports:[],
})
export class MessageModule {}