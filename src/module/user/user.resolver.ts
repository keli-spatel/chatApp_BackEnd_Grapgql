import { Args, Resolver,Mutation, Query } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./Schema/user.schema";
import { Tokens } from "src/common/types/comman.types";

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService){}

    @Query(() => String)
    hello() {
      return 'Hello, world!';
    }

    @Query(() => User, {name:"user"})
    async findone(@Args('_id') _id:string): Promise<User>{
        return this.userService.findOne(_id);
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

    @Mutation(() => User)
    async Login(
        @Args('email') email:string,
        @Args('password') password:string,
    ){
        return this.userService.Login(email,password)
    }

    // @Query(() => User)
    // async me(@CurrentUser() user: any): Promise<User> {
    //     if (!user) {
    //         throw new Error('User not authenticated');
    //       }
    //       return await user;
    // }

    @Mutation(() => Tokens)
    // @UseGuards(AtGuard)
    async TokenFormRT(
        @Args('userId') userId:string,
        @Args('refreshToken') refreshToken:string,
    ):Promise<Tokens>{
        return this.userService.NewToken(userId,refreshToken)
    }

    @Mutation(() => Boolean)
    // @UseGuards(AtGuard)
    async LogOut(
        @Args('userId') userId:string){
            return await this.userService.LogOut(userId)
        }
    
}