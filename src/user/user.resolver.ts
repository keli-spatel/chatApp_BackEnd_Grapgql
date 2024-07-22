import { Args, Resolver,Query } from "@nestjs/graphql";
import { User } from "./entity/user.entity";
import { UserService } from "./user.service";
import { UseGuards } from "@nestjs/common";

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService){}

    @Query(() => [User])
    createUser(){
        return this.userService.findAll()
    }

}