import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1645744716063 implements MigrationInterface {
    name = 'initial1645744716063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "level" ("id" SERIAL NOT NULL, "level" character varying NOT NULL, CONSTRAINT "PK_d3f1a7a6f09f1c3144bacdc6bcc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."developer_gender_enum" AS ENUM('M', 'F', 'I')`);
        await queryRunner.query(`CREATE TABLE "developer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "gender" "public"."developer_gender_enum" NOT NULL, "birthday" TIMESTAMP NOT NULL, "age" integer NOT NULL, "hobby" character varying NOT NULL, "developerLevel" integer, CONSTRAINT "REL_433edf81c5f5af533dc237e8c6" UNIQUE ("developerLevel"), CONSTRAINT "PK_71b846918f80786eed6bfb68b77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "developer" ADD CONSTRAINT "FK_433edf81c5f5af533dc237e8c64" FOREIGN KEY ("developerLevel") REFERENCES "level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "developer" DROP CONSTRAINT "FK_433edf81c5f5af533dc237e8c64"`);
        await queryRunner.query(`DROP TABLE "developer"`);
        await queryRunner.query(`DROP TYPE "public"."developer_gender_enum"`);
        await queryRunner.query(`DROP TABLE "level"`);
    }

}
