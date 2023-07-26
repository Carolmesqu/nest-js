import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { ProdutoCaracteristicaEntity } from './produto-caracteristica.entity';
import { ImagemProdutoEntity } from './produto-imagem.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

@Entity({ name: 'produtos' })
export class ProdutoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ManyToOne(() => UsuarioEntity, (usuarioEntity) =>
  // usuarioEntity.produto, { cascade: true, eager: true })
  // @Column({ name: 'usuario_id', length: 128, nullable: false })
  // usuarioId: UsuarioEntity;

  @Column({ name: 'nome', length: 128, nullable: false })
  nome: string;

  @Column({ name: 'valor', nullable: false })
  valor: number;

  @Column({ name: 'quantidade_disponivel', nullable: false })
  quantidadeDisponivel: number;

  @Column({ name: 'descricao', length: 256, nullable: false })
  descricao: string;

  @Column({ name: 'categoria', length: 128, nullable: false })
  categoria: string;

  @OneToMany(() => ProdutoCaracteristicaEntity, (produtoCaracteristicaEntity) =>
  produtoCaracteristicaEntity.produto, { cascade: true, eager: true }) // Modelo relacional um para muitos e estavamos dizendo a ele pra procurar lá na entidade ProdutoCaracteristicaEntity o campo produto
  caracteristicas: ProdutoCaracteristicaEntity[];

  @OneToMany(() => ImagemProdutoEntity, (produtoImagemEntity) =>
  produtoImagemEntity.produto, { cascade: true, eager: true }) // Modelo relacional um para muitos e estavamos dizendo a ele pra procurar lá na entidade ImagemProdutoEntity o campo produto
  imagens: ImagemProdutoEntity[];  

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
  
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
  
}
