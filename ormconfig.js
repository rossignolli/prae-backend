const srcConfig = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    migrations: ['./src/database/migrations/*.ts'],
    entities: ['./src/models/*.ts'],
    cli: {
        migrationsDir: './src/database/migrations',
    },
};

const distConfig = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    migrations: ['./dist/database/migrations/*.js'],
    entities: ['./dist/models/*.js'],
    cli: {
        migrationsDir: './dist/database/migrations',
    },
    extra: {
        ssl: { rejectUnauthorized: false },
    },
};

module.exports = process.env.NODE_ENV === 'production' ? distConfig : srcConfig;
