import { MigrationInterface, QueryRunner } from "typeorm";

export class relacionaPedidoEItemPedido1690502635635 implements MigrationInterface {
    name = 'relacionaPedidoEItemPedido1690502635635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "itens_pedidos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantidade" integer NOT NULL, "preco_venda" integer NOT NULL, "pedidoId" uuid, CONSTRAINT "PK_d93e780d333fe5d91e43797e8b5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produto_caracteristicas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "descricao" character varying(255) NOT NULL, "produtoId" uuid, CONSTRAINT "PK_132816ff55e30a6bf554c9e2545" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produto_imagens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying(100) NOT NULL, "descricao" character varying(100) NOT NULL, "produtoId" uuid, CONSTRAINT "PK_d1cf326e8d58dbc469bd7fe2f32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "nome"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "nome" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "email" character varying(70) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "senha"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "senha" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "nome"`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "nome" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "descricao"`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "descricao" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "categoria"`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "categoria" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" ADD CONSTRAINT "FK_aaa757efbf4f9fb222709a140b2" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "produto_caracteristicas" ADD CONSTRAINT "FK_67339e59ab4b3ed091cf318f426" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "produto_imagens" ADD CONSTRAINT "FK_eb1531605709dd94ec67b2141d0" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produto_imagens" DROP CONSTRAINT "FK_eb1531605709dd94ec67b2141d0"`);
        await queryRunner.query(`ALTER TABLE "produto_caracteristicas" DROP CONSTRAINT "FK_67339e59ab4b3ed091cf318f426"`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" DROP CONSTRAINT "FK_aaa757efbf4f9fb222709a140b2"`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "categoria"`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "categoria" character varying(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "descricao"`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "descricao" character varying(256) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "nome"`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "nome" character varying(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "senha"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "senha" character varying(256) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "email" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "nome"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "nome" character varying(128) NOT NULL`);
        await queryRunner.query(`DROP TABLE "produto_imagens"`);
        await queryRunner.query(`DROP TABLE "produto_caracteristicas"`);
        await queryRunner.query(`DROP TABLE "itens_pedidos"`);
    }

}
