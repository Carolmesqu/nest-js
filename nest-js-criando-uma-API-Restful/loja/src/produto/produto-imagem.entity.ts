import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { ProdutoEntity } from './produto.entity';

@Entity({ name: 'produto_imagem' })
export class ImagemProdutoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'url', length: 128, nullable: false })
    url: string;

    @Column({ name: 'descricao', length: 128, nullable: false })
    descricao: string;

    @ManyToOne(() => ProdutoEntity, (produto) => produto.caracteristicas, { orphanedRowAction: 'delete', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    produto: ProdutoEntity;
}