import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class createUserDTO {
    static password(password: any): string | PromiseLike<string> {
        throw new Error("Method not implemented.");
    }
    @Field()
    username: string

    @Field()
    email:string

    @Field()
    password:string
}