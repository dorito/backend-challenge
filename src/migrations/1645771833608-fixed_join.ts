import {MigrationInterface, QueryRunner} from "typeorm";

export class fixedJoin1645771833608 implements MigrationInterface {
    name = 'fixedJoin1645771833608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "developer" DROP CONSTRAINT "FK_433edf81c5f5af533dc237e8c64"`);
        await queryRunner.query(`ALTER TABLE "developer" DROP CONSTRAINT "REL_433edf81c5f5af533dc237e8c6"`);
        await queryRunner.query(`ALTER TABLE "developer" ADD CONSTRAINT "FK_433edf81c5f5af533dc237e8c64" FOREIGN KEY ("developerLevel") REFERENCES "level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "developer" DROP CONSTRAINT "FK_433edf81c5f5af533dc237e8c64"`);
        await queryRunner.query(`ALTER TABLE "developer" ADD CONSTRAINT "REL_433edf81c5f5af533dc237e8c6" UNIQUE ("developerLevel")`);
        await queryRunner.query(`ALTER TABLE "developer" ADD CONSTRAINT "FK_433edf81c5f5af533dc237e8c64" FOREIGN KEY ("developerLevel") REFERENCES "level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
