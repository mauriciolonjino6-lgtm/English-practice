"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const env_1 = require("../config/env");
function errorHandler(err, _req, res, _next) {
    console.error('[Error]', err.message);
    res.status(500).json({
        error: 'Internal server error',
        details: env_1.ENV.NODE_ENV === 'development' ? err.message : undefined,
    });
}
//# sourceMappingURL=errorHandler.js.map