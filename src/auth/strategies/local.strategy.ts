import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserService } from "src/user/user.service";

@Injectable()

export class localStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
    // default usernameField is 'username', but we want to use 'email'
        super({ userNameField: 'email' })
    }

    // passport will call this method to validate the user and attach the user object to the request object
    async validate(email: string, password: string) {
        try {
            return await this.userService.varifyUser(email, password)
        }
        catch (error) {
    // rethrow the error as UnauthorizedException since verifyUser might also throw user not found error along with unauthorized error
    // we want to group all the unauthorized errors under UnauthorizedException
    // we don't want to expose the actual error message to the client
            throw new UnauthorizedException("invalid")
        }
    }
}
