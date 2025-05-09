"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenUser = void 0;
const createTokenUser = (user) => {
    return { name: user.name, userId: user.id, role: user.role };
};
exports.createTokenUser = createTokenUser;
