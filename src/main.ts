import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // this helps to log the request and response details
  app.useLogger(app.get(Logger));

  // for the class validator and class transformer
  app.useGlobalPipes(
      new ValidationPipe({
        stopAtFirstError:true,
        transform:true,  // its enable class transform
        transformOptions:{
          enableImplicitConversion: true , // this allow class transformer to conver  to type inplicitly
        }
      })
  )
  await app.listen(process.env.PORT || 3000)
}
bootstrap();
