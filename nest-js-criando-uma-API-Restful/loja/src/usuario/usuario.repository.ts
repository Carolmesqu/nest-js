/* eslint-disable prettier/prettier */
/**
 * Nós vamos utilizar esse repositorio pra salvar os dados que recebemos do
 * usuario controller, no momento vamos salvar os dados do usuario na
 * na memoria, em um array.
 * Um provider no Nest.js é qualquer classe que esteja decorada com @Injectable.
 */

import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuarioRepository {
    //Tipos os nossos Usuarios para um array de UsuarioEntity
    private usuarios: UsuarioEntity[] = [];

    
    //Criamos o metodo salvar, que recebe um usuario e pega esse usuario, o post no controller usa esse metodo  
    async salvar(usuario: UsuarioEntity) {
        this.usuarios.push(usuario);        
    }

    //Metodo para listar, o get no controller vai usar esse metodo
    async listar() {
        return this.usuarios;
    }

    async existeComEmail(email: string) {
        /**
         * O metodo find, vai executar e comparar o email que informamos com o email dos usuarios que estiverem cadastrado
         * Se ele não encontrar o retorno vai ser undefined 
         */
        const possivelUsuario = this.usuarios.find(
            usuario => usuario.email === email
        );

        return possivelUsuario !== undefined;
    }

    private buscaPorId(id: string) {
        const possivelUsuario = this.usuarios.find(
            usuarioSalvo => usuarioSalvo.id === id
        );

        if (!possivelUsuario) {
            throw new Error('Usuário não existe');
        }

        return possivelUsuario;
    }

    /**
     * Aqui nós recebemos um parcial, um objeto que é parcialmente comptaivel com a nossa entidade
     * utilizamos algumas funções auxiliares, com Partial nós não precisamos pegar todos os parametros
     * da classe, nós podemos por exemplo alterar só o e-mail ou senha
     */
    async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
        
        const usuario = this.buscaPorId(id);

        /**
         * Quando fazemos o Object.entries, ele vai devolver um array onde nesse array ele vai pegar a chave desse objeto e o valor
         * e vai colocar em outro array, Array > Array, por ser array podemos fazer um forEach e dentro dele vamos desistruturar o Array 
         * que estamos recebendo, o forEach vai interar no array e cada array desse array e um outro array que tem a chave é o valor que pode
         * vir desse Object.entries.
         * O parametro chave pode ser o nome, email ou senha e o valor que pode ter vindo ou não dessa atualização.
         * Por ser um Partial pode vir ou não a chave Id.
         */

        Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
            //if para previnir que o id do usuario seja trocado por engano
            if(chave === 'id') {
                return;
            }
            //Vamos acessar dinamicamente a propriedade
            usuario[chave] = valor;
        });

        return usuario;
    } 

    /**
     * Primeiro vamos buscar o usuario, e depois vamos usar a função filter e vamos guardar para remover o usuario diferente do que estamos querendo
     */

    async remove(id: string) {
        const usuario = this.buscaPorId(id);

        this.usuarios = this.usuarios.filter(
            usuarioSalvo => usuarioSalvo.id !== id
        );
            
        return usuario;
    }
}