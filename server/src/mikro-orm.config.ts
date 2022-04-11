import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";


export default {
    dbName: 'lireddit',
    debug: !__prod__,
    type: 'postgresql',
    entities: ['./dist/entities'],
    entitiesTs: ['./src/entities'],
    migrations: {
        path: './dist/migrations',
        pathTs: './src/migrations'
    },
  } as Parameters<typeof MikroORM.init>[0];