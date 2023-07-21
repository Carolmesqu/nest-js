import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { ProdutoRepository } from './produto.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoEntity } from './produto.entity';
import { ProdutoService } from './produto.service';
import { ProdutoCaracteristicaEntity } from './produto-caracteristica.entity';
import { ImagemProdutoEntity } from './produto-imagem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoEntity, ProdutoCaracteristicaEntity, ImagemProdutoEntity])], //E fazermos o import do typeorm e a Entity aqui
  controllers: [ProdutoController],
  providers: [ProdutoRepository, ProdutoService], //Para fazermos conexão com o serviço precisamos referenciar ele aqui
})
export class ProdutoModule {}
