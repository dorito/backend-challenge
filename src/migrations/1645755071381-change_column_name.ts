import {MigrationInterface, QueryRunner} from "typeorm";

export class changeColumnName1645755071381 implements MigrationInterface {
    name = 'changeColumnName1645755071381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "level" RENAME COLUMN "level" TO "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "level" RENAME COLUMN "name" TO "level"`);
    }

}
