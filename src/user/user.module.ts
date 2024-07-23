import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/common/database/databasse.module";
import { User, UserSchema } from "./entity/user.entity";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";

@Module({
    imports: [
        DatabaseModule.forFeature([{name: User.name , schema: UserSchema}])
    ],
    providers: [UserRepository,UserService,UserResolver
        
    ],
    controllers:[]
})
export class UserModule{}