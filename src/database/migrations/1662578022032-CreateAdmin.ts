import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAdmin1662578022032 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "admin",
                columns: [
                    {
                        name: "username",
                        type: "varchar",
                        length: "26",
                        isPrimary: true
                    },
                    {
                        name: "password",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("admin");
    }

}
