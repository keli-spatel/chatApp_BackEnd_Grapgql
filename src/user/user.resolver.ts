import { Args, Resolver,Mutation, Query } from "@nestjs/graphql";
import { User } from "./entity/user.entity";
import { UserService } from "./user.service";
import { createUserDTO } from "./dto/createuser.input";

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService){}

    @Query(() => String)
    hello() {
      return 'Hello, world!';
    }
    
    // CreateUser
    @Mutation(() => User)
    async createUser(
        @Args('createUserDTO')createuserDTO:createUserDTO,
        @Args('password') password:string
    ) {
        return this.userService.createUser(password,createuserDTO)
    }
}