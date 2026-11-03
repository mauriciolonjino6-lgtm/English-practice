"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
exports.connectDB = connectDB;
const sequelize_1 = require("sequelize");
const env_1 = require("./env");
const sslOptions = env_1.ENV.DB_SSL
    ? {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    }
    : undefined;
const hasValidDb = Boolean(process.env.DATABASE_URL || (process.env.DB_HOST && process.env.DB_HOST !== 'localhost'));
exports.sequelize = process.env.DATABASE_URL
    ? new sequelize_1.Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: sslOptions,
        logging: false,
        pool: {
            max: 3,
            min: 0,
            acquire: 4000,
            idle: 5000,
        },
        define: {
            underscored: true,
            timestamps: true,
        },
    })
    : new sequelize_1.Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME || 'english_app',
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || '',
        dialectOptions: sslOptions,
        logging: false,
        pool: {
            max: 3,
            min: 0,
            acquire: 4000,
            idle: 5000,
        },
        define: {
            underscored: true,
            timestamps: true,
        },
    });
let isConnected = false;
let connectPromise = null;
async function connectDB() {
    if (isConnected)
        return true;
    if (!hasValidDb) {
        console.warn('[DB] No remote DATABASE_URL configured. Running without persistent database.');
        return false;
    }
    if (connectPromise)
        return connectPromise;
    connectPromise = (async () => {
        try {
            await exports.sequelize.authenticate();
            console.log('[DB] PostgreSQL connected successfully');
            await exports.sequelize.sync({ alter: true });
            console.log('[DB] Models synced successfully');
            isConnected = true;
            return true;
        }
        catch (err) {
            console.error('[DB] Connection warning:', err?.message || err);
            return false;
        }
        finally {
            connectPromise = null;
        }
    })();
    return connectPromise;
}
//# sourceMappingURL=database.js.map