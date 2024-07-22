import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserRepository } from "./user.repository";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    private async hashPassword(password: string) {
        return bcrypt.hash(password, 10);
    }

    async findAll() {
        return this.userRepository.find({});
    }
}