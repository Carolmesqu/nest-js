/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsuarioRepository } from "../usuario.repository";

/**
 * Criamos a nossa classe de validação que implementa a interface ValidatorConstraintInterface, transformamos nossa classe em um provider,
 * configuramos ela como uma validação assincrona, adicionao o nosso provide rno modulo de usuario.
 */
/* eslint-disable prettier/prettier */
@Injectable()
@ValidatorConstraint({async: true})
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {

    /**
     * Usamos o metodo async pra podermos acessar o e-mail com await.
     * Para verificar o usuario nos vamos ter que importar nosso repository, pra termos acesso ao e-mail.
     * Se retornamos true, então a validação passou e ele não precisa disparar mensagem de erro, se for falso
     * ocorreu um erro de validação.
     * Para o usuarioRepository ser injetado no e-mail, precisamos transformar ele em um provider com o @Injectable().
     * Também temos que informar pro validator que o metodo é assincrono, então usamos o decorator @ValidatorConstraint({async: true}).
     * Um decorator no TS é uma função, que devolve uma função e executa alguma coisa em um objeto sendo no seu constructor ou em uma propriedade dele.
     * Vamos criar o nosso decorator aqui mesmo, com o nome EmailEhUnicoAqui e passamos o parametro ValidationOptions, para o nosso decorator aceita as 
     * mesmas opções que os decorators do class-validators.     
     * Dentro da função do nosso decorator, vamos devolver a outra fução que ele precisa para funcionar, como nosso decorator é de propriedade, então 
     * ele vai receber dois parametros o primeiro é o objeto onde ele está sendo executado e o segunda propriedade que é uma string, no caso a propriedade 
     * onde esse decorator vai ser validado, nos vamos registrar o nosso decorator que vai agir sobre esse objeto e propriedade, mas usar a nossa classe de 
     * validação que acabamos de escrever. Faremos isso com uma função registerDecorator(), que vem do class-validation, essa função recebe varias propriedades
     * para registrar o nosso decorator, o 1 parametro é o target é o construtor do objeto, o 2 parametro é o nome da propriedade na qual o decorator vai ser 
     * aplicado e 3 são as opções de validação, a options e passamos o valor de opçõesDevalidação, tem o 4 que o constraints  e o 5 é validator que só precisamos 
     * passar a referencia para nossa classe.
     * 
     * Vamos usar esse decorator no DTO de Usuario 
     * 
     */

    constructor(
        private usuarioRepository: UsuarioRepository
    ) {}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
       const usuarioComEmailExiste = await this.usuarioRepository.existeComEmail(value);
        return !usuarioComEmailExiste;
    }

    /* 
    Aqui podemos escrever uma mensagem string, esse metodo é opcional
    defaultMessage?(validationArguments?: ValidationArguments): string {
        throw new Error("Method not implemented.");
    }
    */
}

export const EmailEhUnicoAqui = (opcoesDeValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: EmailEhUnicoValidator
        });

    }

}