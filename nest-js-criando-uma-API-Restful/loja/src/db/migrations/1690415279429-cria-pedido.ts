import { MigrationInterface, QueryRunner } from "typeorm";

export class criaPedido1690415279429 implements MigrationInterface {
    name = 'criaPedido1690415279429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(128) NOT NULL, "email" character varying(64) NOT NULL, "senha" character varying(256) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pedidos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "valor_total" integer NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "usuarioId" uuid, CONSTRAINT "PK_ebb5680ed29a24efdc586846725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produtos_caracteristicas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(128) NOT NULL, "descricao" character varying(128) NOT NULL, "produtoId" uuid, CONSTRAINT "PK_21612e9a7f575e241e1cd599afa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produto_imagem" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying(128) NOT NULL, "descricao" character varying(128) NOT NULL, "produtoId" uuid, CONSTRAINT "PK_9521d5d39cf4b36c1626cdd4fbd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produtos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(128) NOT NULL, "valor" integer NOT NULL, "quantidade_disponivel" integer NOT NULL, "descricao" character varying(256) NOT NULL, "categoria" character varying(128) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_a5d976312809192261ed96174f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD CONSTRAINT "FK_e60a655127c227b5e063e73165b" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produtos_caracteristicas" ADD CONSTRAINT "FK_0b227ec9bcbdd0b20f1eb128519" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "produto_imagem" ADD CONSTRAINT "FK_943b51844e69e663d5f55a0c662" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produto_imagem" DROP CONSTRAINT "FK_943b51844e69e663d5f55a0c662"`);
        await queryRunner.query(`ALTER TABLE "produtos_caracteristicas" DROP CONSTRAINT "FK_0b227ec9bcbdd0b20f1eb128519"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP CONSTRAINT "FK_e60a655127c227b5e063e73165b"`);
        await queryRunner.query(`DROP TABLE "produtos"`);
        await queryRunner.query(`DROP TABLE "produto_imagem"`);
        await queryRunner.query(`DROP TABLE "produtos_caracteristicas"`);
        await queryRunner.query(`DROP TABLE "pedidos"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
