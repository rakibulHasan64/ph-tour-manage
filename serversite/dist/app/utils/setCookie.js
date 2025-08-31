"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthcookie = void 0;
const setAuthcookie = (res, tokenInfo) => {
    if (tokenInfo.accessToken) {
        res.cookie('accessToken', tokenInfo.accessToken, {
            httpOnly: true,
            secure: false
        });
    }
    if (tokenInfo.refreshToken) {
        res.cookie('refreshToken', tokenInfo.refreshToken, {
            httpOnly: true,
            secure: false
        });
    }
};
exports.setAuthcookie = setAuthcookie;
