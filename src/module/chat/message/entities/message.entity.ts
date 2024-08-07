import { Field, ObjectType } from "@nestjs/graphql";
import { AbstractSchema } from "src/common/database/abstract.schema";
import { DateScalar } from "src/common/scalars/date.scalars";
import { User } from "src/module/user/Schema/user.schema";

@ObjectType()
export class Message extends AbstractSchema {
    
    @Field(() => String)
    content: string
    
    @Field()
    createdAt: Date
    
    @Field(() => User)
    user: User

    @Field()
    chatId: string
}