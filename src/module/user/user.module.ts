import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/common/database/databasse.module";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { User, UserSchema } from "./Schema/user.schema";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [
        DatabaseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    providers: [UserRepository, UserService, UserResolver,JwtService

    ],
    exports: [UserService],
    controllers: []
})
export class UserModule { }