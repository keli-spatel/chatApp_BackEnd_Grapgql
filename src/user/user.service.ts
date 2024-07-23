import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserRepository } from "./user.repository";
import * as bcrypt from 'bcrypt'
import { User } from "./entity/user.entity";
import { createUserDTO } from "./dto/createuser.input";

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
}