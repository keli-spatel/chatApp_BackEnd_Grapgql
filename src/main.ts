import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
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
