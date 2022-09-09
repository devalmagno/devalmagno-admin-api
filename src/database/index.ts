import "reflect-metadata";
import dotenv from 'dotenv';
import { Connection, ConnectionOptions, createConnection, getConnectionOptions } from "typeorm";

dotenv.config();

export default async (): Promise<Connection> => {
    let connectionOptions: ConnectionOptions;
    connectionOptions = {
        type: "postgres",
        synchronize: false,
        logging: false,
        extra: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            }
        },
        entities: [
            "./dist/src/entities/**.js"
        ],
        migrations: ["./dist/src/database/migrations/**.js"],
        cli: {
            migrationsDir: "./dist/src/database/migrations",
        },
        migrationsRun: true,
    }

    if (process.env.DATABASE_URL) {
        console.log(process.env.DATABASE_URL);
        Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
    } else {
        // gets your default configuration
        // you could get a specific config by name getConnectionOptions('production')
        // or getConnectionOptions(process.env.NODE_ENV)
        connectionOptions = await getConnectionOptions();
    }

    return createConnection(connectionOptions);
}