import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller';
import { UsuarioRepository } from './usuario.repository';
import { EmailEhUnicoValidator } from './validacao/email-eh-unico.validator';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity';

/**
 * Todo module temos que passar um objeto, mesmo que seja vazio.
 * Criamos um modulo de usuraio, para agrupar todas as informações de usuario,
 * referente a usuario vai ficar encapsulado dentro desse module e agrupado.
 */

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity])], // Aqui estamos dizendo que dentro desse modulo temos uma entidade, pra o typeOrm ter esse conhecimento
    controllers: [UsuarioController],
    providers: [UsuarioService, UsuarioRepository, EmailEhUnicoValidator],
})
export class UsuarioModule {}
