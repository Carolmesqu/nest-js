import { Catch, HttpException, ExceptionFilter, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

//Pegar o filtro de erro que queremos aqui \/ vamos garantir que aqui só vamos capturar erros do tipo HttpException, quando não passamos parametro capturamos todos os tipos de erro
@Catch()
export class FiltroDeExcecaoGlobal implements ExceptionFilter {

    constructor(private adapterHost: HttpAdapterHost) {}

    catch(excecao: unknown, host: ArgumentsHost) {
       console.log(excecao);

       const { httpAdapter } = this.adapterHost;

       const contexto = host.switchToHttp(); //Significa trocar para http, especificamos para nosso codigo que estamos trabalhando em um contexto http
       const resposta = contexto.getResponse();
       const requisicao = contexto.getRequest();

    //    const status = excecao.getStatus();
    //    const body = excecao.getResponse();

    //Abrimos as chaves para fazer uma desestruturação, conseguimos fazer atribuições multiplas
    const { status, body } = excecao instanceof HttpException ? 
        {
            status: excecao.getStatus(),
            body: excecao.getResponse()
        } : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                timestamp: new Date().toISOString(),
                path: httpAdapter.getRequestUrl(requisicao),
            }
        }

       httpAdapter.reply(resposta, body, status);
    }
}

/**
 * Criamos um filtro minimo de códigos de exceção HTTP
 */