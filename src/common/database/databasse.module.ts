import { Logger, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ModelDefinition, MongooseModule } from "@nestjs/mongoose";
import { connect } from "http2";
import { connection, Mongoose } from "mongoose";

@Module({
    imports:[
        MongooseModule.forRootAsync({
            useFactory:(configService:ConfigService) => ({
            uri: configService.get<string>('MONGODB_URI'),
            connectionFactory:(connection) => {
                Logger.log("DataBase Connected", 'MongooseModule')
                return connection;
            }}),
            inject:[ConfigService]
        })
    ],
    controllers:[],
    providers:[],
})
export class DatabaseModule {
    static forFeature(models: ModelDefinition[]){
        return MongooseModule.forFeature(models);
    }
}