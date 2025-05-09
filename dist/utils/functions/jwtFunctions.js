"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createJWT = (userToken) => {
    const token = jsonwebtoken_1.default.sign(userToken, String(process.env.JWT_SECRET), { expiresIn: '1d' });
    return token;
};
const attachCookieToResponse = (res, userToken) => {
    const token = createJWT(userToken);
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        secure: process.env.NODE_ENV === 'production',
        signed: true
    });
};
const isTokenValid = (token) => jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET));
exports.default = {
    createJWT,
    attachCookieToResponse,
    isTokenValid
};
