import { Inject, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from 'joi';
import { UserModule } from "./user/user.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { MongooseModule } from "@nestjs/mongoose";
import { join } from "path";
import { LoggerModule } from 'nestjs-pino';


 

@Module({
  imports: [
    /// Configration setup
    ConfigModule.forRoot({
      cache: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development','production')
          .default('development'),
        PORT: Joi.number().port().default(3000),  
        MONGODB_URI: Joi.string().required(),
        GRAPHQL_PLAYGROUND: Joi.boolean().required(), 
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true
      }
    }), 

    /// MongoDB setup
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({        
        uri: configService.get<string>('MONGODB_URI'),
      }),
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
    }),

    /// Graphql setup
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async (configService: ConfigService) => ({
         autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
         playground: configService.get<boolean>('GRAPHQL_PLAYGROUND'),
         introspection: configService.get<string>('NODE_ENV') !== 'production',
         context: ({ req, resp }) => ({ req, resp}),
         csrfPrevention: true,  
      }),
      imports: [ ConfigModule ], 
      inject: [ ConfigService ],
    }),
    UserModule,
    LoggerModule.forRootAsync({
      useFactory:(configservice: ConfigService) => {
        const isProduction = configservice.getOrThrow('NODE_ENV') === 'production';

        return{
          pinoHttp:{
             // we will remove pino-pretty in production since it might slow down the app
              transform: isProduction
              ? undefined  
              :{
                target:'pino-pretty',
                options:{
                  singleLine: true
                }
              },
            // debug might be too verbose for production
              level: isProduction ? "info" : 'debug',
          }
        }
      },
    inject:[ConfigService]
    })
  ],
  controllers: [],
  providers: [],                                        
})
export class AppModule {}