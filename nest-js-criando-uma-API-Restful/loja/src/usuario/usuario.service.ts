import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { Repository } from "typeorm";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";

@Injectable()
export class UsuarioService {
    // Toda vez que nossa classe for instancia esse metodo vai ser executado por default, essa é a função do nosso construtor
    constructor(
        @InjectRepository(UsuarioEntity) // Estamos criando um repositorio em cima de uma entidade já existente, vamos injetar no UsuarioEntity
        private readonly usuarioRepository: Repository<UsuarioEntity> // Agora estamos dando acesso apenas de leitura para ela
    ) {}

    async criaUsuario(usuarioEntity: UsuarioEntity) {
        await this.usuarioRepository.save(usuarioEntity); // Utilizamos o save, pois ele via salvar no banco de dados
    }

    // Função para recuperar os usuarios do banco
    async listaUsuarios() {
        // Aqui vemos todos os usuarios
        const usuariosSalvos = await this.usuarioRepository.find();
        //  Aqui vamos cria um novo array de usuarios
        const usuariosLista = usuariosSalvos.map((usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome));
        return usuariosLista;
    }

    async atualizaUsuario(id: string, usuarioEntity: AtualizaUsuarioDTO) {
       await this.usuarioRepository.update(id, usuarioEntity);
    }

    async deleteUsuario(id: string) {
       await this.usuarioRepository.delete(id);
    }
}