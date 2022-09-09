import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProject1662578037284 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "projects",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "img_address",
                        type: "varchar",
                        length: "50",
                    },
                    {
                        name: "title",
                        type: "varchar",
                        length: "40",
                    },
                    {
                        name: "description",
                        type: "varchar",
                        length: "120",
                    },
                    {
                        name: "url",
                        type: "varchar",
                        length: "60",
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
        await queryRunner.dropTable("projects");
    }

}
