import { Args, Resolver,Mutation, Query } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./Schema/user.schema";

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
        @Args('email') email: string, 
        @Args('password') password: string,
        @Args('userName') userName: string
    ) {
        return this.userService.createUser(email, password,userName);
    }

}