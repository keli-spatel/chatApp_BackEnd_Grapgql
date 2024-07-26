import { Field, HideField, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractSchema } from "src/common/database/abstract.schema";

@Schema({ timestamps: true })
@ObjectType()
export class User extends AbstractSchema{

    @Prop()
    @Field(() => String)
    userName: string

    @Prop()
    @HideField()
    password:string

    @Prop()
    @Field(() => String)
    email: string

    @Field()
    accessToken?:string

    @Prop({default:null})
    @Field(() => String)
    refreshToken?: string

}

export const UserSchema = SchemaFactory.createForClass(User);