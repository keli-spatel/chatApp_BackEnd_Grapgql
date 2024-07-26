import { Module } from "@nestjs/common";
import { access } from "fs";
import { AccessTokenGuard } from "./guards/AT.guard";
import { RefreshTokenGuard } from "./guards/RT.guard";
import { AccessTokenStrategy } from "./strategies/accessToken.strategy";
import { RefreshTokenStrategy } from "./strategies/refreshToken.strategy";
import { UserModule } from "../user/user.module";

@Module({

    imports:[UserModule],
    providers:[AccessTokenGuard,RefreshTokenGuard,AccessTokenStrategy,RefreshTokenStrategy],
    exports:[],
    controllers:[]
})

export class AuthModule{}
