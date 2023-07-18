import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity({ name: 'produtos_caracteristicas' })
class ProdutoCaracteristica {
    @Column({ name: 'nome', length: 128, nullable: false })
    nome: string;

    @Column({ name: 'descricao', length: 128, nullable: false })
    descricao: string;

    // @CreateDateColumn({ name: 'created_at' })
    // createdAt: string;

    // @UpdateDateColumn({ name: 'updated_at' })
    // updatedAt: string;
    
    // @DeleteDateColumn({ name: 'deleted_at' })
    // deletedAt: string;
}   