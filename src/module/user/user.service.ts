import { ForbiddenException, Injectable, UnauthorizedException, UnprocessableEntityException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import * as bcrypt from 'bcrypt'
import { error } from "console";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { TokenPayload, Tokens } from "src/common/types/comman.types";
import { createUserDTO } from "./dto/createuser.input";
import { User } from "./Schema/user.schema";
import { ForbiddenError } from "apollo-server-express";

@Injectable()
export class UserService {
    
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    // hashData with dynamically value
    private async hashData<T>(data: T): Promise<T> {
        // 10 is the number of salt rounds. The higher the number, the more secure the hash.
        return bcrypt.hash(data, 10);
    }

    async createUser(email: string, password: string, userName:string): Promise<Partial<User>> {
        try {
          const newUser = await this.userRepository.create({
              email,
              userName,
              password: await this.hashData(password),
          });
          
          const token = await this.getToken(newUser._id.toString(), newUser.email);
    
          await this.UpdateHashRT(newUser._id.toString(), token.refreshToken);
          
          return {
            ...newUser,
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
          }
        } catch (error) {
          // E11000 is the error code for duplicate key error
          if (error.message.includes('E11000')) {
            throw new UnprocessableEntityException(
              'User with this email already exists',
            );
          }
          throw error;
        }
      }

    //  Check and Varify User
    async varifyUser(email: string, password: string) {
        const user = await this.userRepository.find({ email });


        // user not found scenario is handled in the abstract repository
        const isPosswordValid = await bcrypt.compare(password, user.password)

        if (!isPosswordValid) {
            throw new UnauthorizedException(error);
        } else {
            return user;
        }
    }

    // Generate refreshToken and AccessToken
    async getToken(userId: string, email: string): Promise<Tokens> {

        const tokenPayload: TokenPayload = {
            _id: userId,
            email: email,
        }

        const [RT, AT] = await Promise.all([
            this.jwtService.signAsync(tokenPayload, {
                secret: this.configService.getOrThrow<string>("REFRESH_TOKEN_SECRET"),
                expiresIn: '7d',
            }),
            this.jwtService.signAsync(tokenPayload, {
                secret: this.configService.getOrThrow<string>("ACCESS_TOKEN_SECRET"),
                expiresIn: '10m',
            }),
        ]);

        return {
            accessToken: AT,
            refreshToken: RT
        }
    }

    // Hash Refreshtoken and Update
    async UpdateHashRT(userId: string, oRT: string): Promise<void> {
        const hashRT = await this.hashData(oRT)

        await this.userRepository.findOneAndUpdate(
            { _id: userId },
            {
                $set: {
                    refreshToken: hashRT
                }
            }
        )
    }

    async NewToken(userId:string , RT:string){
        const user = await this.userRepository.findOne({_id:userId})

        if(!user || !user.refreshToken) throw new ForbiddenException("Access Denied")

        const RTMatch = await bcrypt.compare(RT , user.refreshToken)

        if(!RTMatch) throw new ForbiddenException("Access Denied")

        const token = await this.getToken(user._id.toString(), user.email)

        await this.UpdateHashRT(user._id.toString() , user.refreshToken)
    
        return token
    }
}