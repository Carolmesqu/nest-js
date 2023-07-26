import { PedidoEntity } from '../pedido/pedido.entity';
import { ProdutoEntity } from '../produto/produto.entity';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

// Primeira passo anotar nossa classe com a propriedade Entity, o name é o que está no banco de dados a tabela 
@Entity({ name: 'usuarios' })
export class UsuarioEntity {
    // Pra ele gerar o id em hash
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // Segundo vamos nomear as colunas dentro da nossa entidade que estão na tabela usuarios de banco de dados, 
    // também colocamos o tamanho com length e o nullable que vai ser false para pode ser not null 
    @Column({ name: 'nome', length: 128, nullable: false })
    nome: string;

    @Column({ name: 'email', length: 64, nullable: false })
    email: string;

    @Column({ name: 'senha', length: 256, nullable: false })
    senha: string;

    // @OneToMany(() => ProdutoEntity, (produto) => produto.usuarioId, { orphanedRowAction: 'delete', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    // produto: ProdutoEntity[];

    // Pra gerar um log sempre que houve um movimento relacionado a opção abaixo
    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;
    
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;

    @OneToMany(() => PedidoEntity, (pedido) => pedido.usuario)
    pedidos: PedidoEntity[];
}