/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Post } from '@nestjs/common';
import { Body, Param } from '@nestjs/common/decorators';
import { Delete, Get, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioRepository } from './usuario.repository';
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';

/**
 * Todo controller em Nest.js é decorado com um controller,
 * usar o controller nos permite criar uma rota para usuarios.
 * Como não passamos nenhum parametro, essa rota vai ser a raiz
 * da aplicação.
 */

@Controller('/usuarios')
export class UsuarioController {
  /**
   * Vamos criar um método, um método com async pra podermos
   * trabalhar com promises, estamos utilizando o decorator
   * Post pra receber os dados e utlizamos o decorator Body
   * dessa forma conseguimos mandar dados da rota usuario e
   * receber eles atraves do body
   */

  constructor(
    private usuarioRepository: UsuarioRepository
    ) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.senha = dadosDoUsuario.senha;
    usuarioEntity.nome = dadosDoUsuario.nome;
    //uuid é uma biblioteca de auto incremento de id
    usuarioEntity.id = uuid();
    
  this.usuarioRepository.salvar(usuarioEntity);
    return { 
      usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
      message: 'usuário criado com sucesso' };
  }

  //Metodo para listar usuarios
  @Get()
  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.listar();
    const usuariosLista = usuariosSalvos.map(
      usuario => new ListaUsuarioDTO(
        usuario.id,
        usuario.nome
      )
    );

    return usuariosLista;
  }

  //Metodo para atualizar usuario
  @Put('/:id')
  async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO) {
    const usuarioAtualizado = await this.usuarioRepository.atualiza(id, novosDados);
    return {
      usuario: usuarioAtualizado,
      message: 'usuário atualizado com sucesso',
    }
  }

  //Metodo para deletar
  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    const usuarioRemovido = await this.usuarioRepository.remove(id);

    return {
      usario: usuarioRemovido,
      message: 'usuário removido com sucesso',

    }
  }
}
