import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy ,ExtractJwt} from "passport-jwt";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "RefreshToken"){
    constructor(private configService: ConfigService){
       super ({
           jwtFromRequest: ExtractJwt.fromHeader("token"),
           ignoreExpiration:true,
           secretOrKey: configService.get<string>("REFRESH_TOKEN_SECRET") 
        })
    }
}