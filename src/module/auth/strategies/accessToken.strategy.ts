import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportModule, PassportStrategy } from "@nestjs/passport";
import { Strategy,ExtractJwt } from "passport-jwt";
import { User } from "src/module/user/Schema/user.schema";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy,"accessToken"){

    constructor(private configService : ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromHeader('token'),
            ignoreExpiration:true,
            secretOrKey:configService.get<string>("ACCESS_TOKEN_SECRET")
        })
    }
    async validate(payload:any): Promise<Partial<User>>{
        return { _id:payload._id,email:payload.email};
    }
}