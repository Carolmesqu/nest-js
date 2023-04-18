/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //O Transform vai transformar o JSON no CriaUsuarioDTO
      transform: true,
      //Quando o Nest for usar a validação desse pipe abaixo, ele vai ignorar todas as propriedades que vão vir no JSON e não estiverem no nosso DTO
      //ele não recebe o valor mas também não dá erro
      whitelist: true,
      //Esse abaixo usamos para lançar um erro que não está no nosso DTO
      forbidNonWhitelisted: true,
    }),
  );

  /**
   * Para o class validator resolver as dependencias que so o nest sabe resolver, precisamos passar como parametro o mesmo container de dependencia que o nest usa.
   * A partir dai, da raiz da aplicação, conseguimos resolver qualquer dependencias que estiver abaixo da raiz.
   */

  useContainer(app.select(AppModule), {fallbackOnErrors: true});

  await app.listen(3000);
}
bootstrap();
