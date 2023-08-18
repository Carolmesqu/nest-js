import { Catch, HttpException, ExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { Response } from "express";

//Pegar o filtro de erro que queremos aqui \/ vamos garantir que aqui só vamos capturar erros do tipo HttpException
@Catch(HttpException)
export class FiltroDeExcecaoHttp implements ExceptionFilter {
    catch(excecao: HttpException, host: ArgumentsHost) {
       console.log(excecao);

       const contexto = host.switchToHttp(); //Significa trocar para http, especificamos para nosso codigo que estamos trabalhando em um contexto http
       const resposta = contexto.getResponse<Response>();

       const status = excecao.getStatus();
       const body = excecao.getResponse();

       resposta.status(status).json(body);

    }
}

/**
 * Criamos um filtro minimo de códigos de exceção HTTP
 */