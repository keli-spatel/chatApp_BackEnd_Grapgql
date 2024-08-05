import { Field, InputType } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

@InputType()
export class CreateChatDto{

    @Field()
    @IsNotEmpty({message:"chatName Cannot be empty"})
    @IsString({message: "Name shoud be in string"} )
    @MinLength(2,{message:"Name shoub greater then 2"})
    @MaxLength(30,{message:"name shoud be not greater than 30"})
    @Transform(({value}) => value.trim())
    name:string
} 