import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { localStrategy } from "./strategies/local.strategy";
import { AuthService } from "./auth.service";

@Module({

    imports:[UserModule],
    providers:[localStrategy,AuthService],
    exports:[],
    controllers:[]
})

export class AuthModule{}
