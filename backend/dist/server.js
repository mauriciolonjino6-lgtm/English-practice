"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const database_1 = require("./config/database");
const env_1 = require("./config/env");
require("./models");
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
exports.app = app;
// ── Security & Middleware ──────────────────────────────────────────────────────
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false,
}));
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
app.use((0, morgan_1.default)(env_1.ENV.NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// ── Instant Health Check (Responds immediately, no DB blocking) ───────────────
app.get(['/health', '/api/health'], (_req, res) => {
    res.json({
        ok: true,
        env: env_1.ENV.NODE_ENV,
        hasDbUrl: Boolean(process.env.DATABASE_URL || env_1.ENV.DATABASE_URL),
        hasGeminiKey: Boolean(process.env.GEMINI_API_KEY || env_1.ENV.GEMINI_API_KEY),
        status: 'healthy',
        timestamp: new Date().toISOString(),
    });
});
// ── Rate Limiting ─────────────────────────────────────────────────────────────
app.use('/api', (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: 120,
    message: { error: 'Too many requests, slow down.' },
}));
// ── API Routes (Mounted on both /api and / to support all rewrite scenarios) ──
app.use('/api', routes_1.default);
app.use('/', routes_1.default);
// ── Static Frontend Serving (if running standalone server outside Vercel) ─────
if (!process.env.VERCEL) {
    const frontendDist = path_1.default.resolve(__dirname, '../../frontend/dist');
    if (fs_1.default.existsSync(frontendDist)) {
        app.use(express_1.default.static(frontendDist));
        app.get('*', (_req, res) => {
            res.sendFile(path_1.default.join(frontendDist, 'index.html'));
        });
    }
}
// ── Error Handler ─────────────────────────────────────────────────────────────
app.use(errorHandler_1.errorHandler);
// ── Start Server (Only for non-serverless environments) ────────────────────────
if (!process.env.VERCEL) {
    (0, database_1.connectDB)().catch(console.warn);
    app.listen(env_1.ENV.PORT, () => {
        console.log(`[Server] running on http://localhost:${env_1.ENV.PORT}`);
    });
}
exports.default = app;
//# sourceMappingURL=server.js.map