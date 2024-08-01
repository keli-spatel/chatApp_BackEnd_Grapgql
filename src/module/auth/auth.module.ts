import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { RtGuard } from "./guards/RT.guard";
import { AtStrategy } from "./strategies/accessToken.strategy";
import { RtStrategy } from "./strategies/refreshToken.strategy";
import { AtGuard } from "./guards/AT.guard";

@Module({

    imports:[UserModule],
    providers:[AtGuard,RtGuard,AtStrategy,RtStrategy],
    exports:[],
    controllers:[]
})

export class AuthModule{}
