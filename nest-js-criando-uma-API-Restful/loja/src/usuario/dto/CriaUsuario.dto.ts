import { IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import { EmailEhUnicoAqui } from '../validacao/email-eh-unico.validator';

/* eslint-disable prettier/prettier */
export class CriaUsuarioDTO {
/**
 * Para criar usuario nos usamos o DTO e as validações dele são os @ abaixo
 * o @IsNotEmpty() verifica se é uma string Null ou vazia e
 */
        
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    nome: string;

    @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
    @EmailEhUnicoAqui({message: 'Já existe um usuário com este e-mail'})
    email: string;

    @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
    senha: string;
}