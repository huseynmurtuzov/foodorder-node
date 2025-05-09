"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const unauthenticated_1 = require("../errors/unauthenticated");
const unauthorized_1 = require("../errors/unauthorized");
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.signedCookies.token;
    if (!token) {
        throw new unauthorized_1.UnauthorizedError("Authentication Invalid");
    }
    try {
        const { name, userId, role } = token;
        req.user = { name, userId, role };
        next();
    }
    catch (error) {
        throw new unauthenticated_1.UnauthenticatedError("Authentication Invalid");
    }
});
const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new unauthorized_1.UnauthorizedError("Unauthorized to access this route");
        }
        next();
    };
};
exports.default = {
    authenticateUser,
    authorizePermissions
};
