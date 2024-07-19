import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import Joi, { cache } from "joi";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache:true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal:true,
      validationSchema:Joi.object({
        NODE_ENV:Joi.string()
        .valid('development', 'production')
        .default('development'),
      PORT: Joi.number().port().default(3000),
      MONGODB_URI: Joi.string().required(),
      GRAPHQL_PLAYGROUND: Joi.boolean().required(),
      }),
      
    })
  ],
  controllers: [],
  providers: [],
})
export class appModule{}