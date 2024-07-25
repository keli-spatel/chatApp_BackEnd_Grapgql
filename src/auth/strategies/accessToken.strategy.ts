import { Injectable } from "@nestjs/common";
import { PassportModule, PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy,"accessToken"){
    
}