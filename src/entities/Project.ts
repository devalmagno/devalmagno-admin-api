import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("projects")
class Project {

    @PrimaryColumn()
    id: string;

    @Column()
    img_address: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    url: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) this.id = uuid();
    }
}

export { Project };