"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthcookie = void 0;
const env_1 = require("../config/env");
const setAuthcookie = (res, tokenInfo) => {
    if (tokenInfo.accessToken) {
        res.cookie('accessToken', tokenInfo.accessToken, {
            httpOnly: true,
            secure: env_1.envVars.NODE_ENV === "development",
            sameSite: "none"
        });
    }
    if (tokenInfo.refreshToken) {
        res.cookie('refreshToken', tokenInfo.refreshToken, {
            httpOnly: true,
            secure: env_1.envVars.NODE_ENV === "development",
            sameSite: "none"
        });
    }
};
exports.setAuthcookie = setAuthcookie;
