import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, ManyToOne } from 'typeorm';
import { ProdutoEntity } from './produto.entity';

@Entity({ name: 'produtos_caracteristicas' })
export class ProdutoCaracteristicaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'nome', length: 128, nullable: false })
    nome: string;

    @Column({ name: 'descricao', length: 128, nullable: false })
    descricao: string;

    @ManyToOne(() => ProdutoEntity, (produto) => 
    produto.imagens, { orphanedRowAction: 'delete', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    produto: ProdutoEntity; //Aqui dizemos que ele recebe um produto da entidade ProdutoEntity mapeamentos inverso

    // @CreateDateColumn({ name: 'created_at' })
    // createdAt: string;

    // @UpdateDateColumn({ name: 'updated_at' })
    // updatedAt: string;
    
    // @DeleteDateColumn({ name: 'deleted_at' })
    // deletedAt: string;
}   