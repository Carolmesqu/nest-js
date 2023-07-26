import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { Repository } from "typeorm";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";

@Injectable()
export class UsuarioService {
    // Toda vez que nossa classe for instancia esse metodo vai ser executado por default, essa é a função do nosso construtor
    constructor(
        @InjectRepository(UsuarioEntity) // Estamos criando um repositorio em cima de uma entidade já existente, vamos injetar no UsuarioEntity
        private readonly usuarioRepository: Repository<UsuarioEntity> // Agora estamos dando acesso apenas de leitura para ela
    ) {}

    async criaUsuario(dadosDoUsuario: CriaUsuarioDTO) {
        const usuarioEntity = new UsuarioEntity();
    
        usuarioEntity.email = dadosDoUsuario.email;
        usuarioEntity.senha = dadosDoUsuario.senha;
        usuarioEntity.nome = dadosDoUsuario.nome;
    
        return this.usuarioRepository.save(usuarioEntity);
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