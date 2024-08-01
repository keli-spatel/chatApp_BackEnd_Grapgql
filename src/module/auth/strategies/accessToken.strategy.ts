import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {  PassportStrategy } from "@nestjs/passport";
import { Strategy,ExtractJwt } from "passport-jwt";
import { User } from "src/module/user/Schema/user.schema";


@Injectable()
export class AtStrategy extends PassportStrategy(Strategy,'AccessToken') {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('token'),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('ACCESS_TOKEN_SECRET'),
            passReqToCallback: false,
        })
    }
    async validate(payload: any): Promise<Partial<User>> {
        return { _id: payload._id, email: payload.email };
      }
}

