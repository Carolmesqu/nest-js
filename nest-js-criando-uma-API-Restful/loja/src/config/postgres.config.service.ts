import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
    // Vamos criar o construtor para termos uma execução assim a classe for criada, ela é importada no app.module, 
    // quando ela for importada o que já estiver no construtor seja executada
    constructor(
        private configService: ConfigService
    ) {}

    // Criando função para o typeOrm ter algumas opções e se conectar com banco de dados
    createTypeOrmOptions(): TypeOrmModuleOptions {
        // Nosso retornor será configurações do banco, do nosso objeto SÃO INFOS IMPORTANTES PARA O TYPEORM TRABALHAR
        return {
            type: 'postgres',
            host: this.configService.get<string>('DB_HOST'),            
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USERNAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
            // Da forma que escrevemos abaixo, estamos dizendo para ele voltar para o diretorio default e a partir dele acessa uma página
            // e depois disso acesse os arquivos que tenha .entity
            entities: [__dirname + '/../**/*.entity{.js,.ts}'],
            //synchronize: true //Faz o trabalho de criar as tabelas, só é útil em ambiente de desenvolvimento
        }
    }
}