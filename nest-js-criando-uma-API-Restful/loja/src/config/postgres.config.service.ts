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
        // Nosso retornor será configurações do banco
        return {
            type: 'postgres',
            host: this.configService.get<string>('DB_HOST'),            
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USERNAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
            entities: [],
            synchronize: true
        }
    }
}