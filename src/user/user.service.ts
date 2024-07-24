import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import * as bcrypt from 'bcrypt'
import { User } from "./entity/user.entity";
import { createUserDTO } from "./dto/createuser.input";
import { error } from "console";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    // hashData with dynamically value
    private async hashData<T>(data:T): Promise<T>{
    // 10 is the number of salt rounds. The higher the number, the more secure the hash.
        return bcrypt.hash(data , 10);
  }

    async createUser(password: string, createuserDTO: createUserDTO): Promise<User>{
        const newUser = await this.userRepository.create({
            ...createuserDTO,
            password: await this.hashData(password)
        })
        return newUser;
    }

    async varifyUser(email:string,password:string){
        const user = await  this.userRepository.find({email});
    // user not found scenario is handled in the abstract repository

    const isPosswordValid = await bcrypt.compare(password ,user.password)

    if(!isPosswordValid){
        throw new UnauthorizedException(error);
    }else{
        return user;
    }

    }
    
}