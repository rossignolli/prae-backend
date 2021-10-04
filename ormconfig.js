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
    migrations: ['./src/database/migrations/*.js'],
    entities: ['./src/models/*.js'],
    cli: {
        migrationsDir: './src/database/migrations',
    },
    extra: { rejectUnauthorized: false },
};

module.exports = process.env.NODE_ENV === 'production' ? distConfig : srcConfig;
