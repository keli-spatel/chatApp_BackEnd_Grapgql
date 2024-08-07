import { Field, InputType } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsString, MaxLength } from "class-validator";

@InputType()
export class CreateMessageDto {

    @Field()
    @IsNotEmpty()
    @IsString()
    @MaxLength(1000)
    @Transform(({value}) => value.trim())
    content:string;

    @Field()
    @IsNotEmpty()
    @IsMongoId()
    @IsMongoId()
    @Transform(({value}) => value.trim())
    chatId:string;

}