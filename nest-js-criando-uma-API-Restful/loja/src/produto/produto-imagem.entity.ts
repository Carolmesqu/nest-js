import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity({ name: 'produto_imagem' })
class ImagemProduto {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'url', length: 128, nullable: false })
    url: string;

    @Column({ name: 'descricao', length: 128, nullable: false })
    descricao: string;
}