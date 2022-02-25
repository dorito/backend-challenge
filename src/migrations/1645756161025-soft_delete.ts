import {MigrationInterface, QueryRunner} from "typeorm";

export class softDelete1645756161025 implements MigrationInterface {
    name = 'softDelete1645756161025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "level" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "developer" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "developer" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "level" DROP COLUMN "deletedAt"`);
    }

}
