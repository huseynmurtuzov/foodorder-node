"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermission = void 0;
const unauthorized_1 = require("../../errors/unauthorized");
const checkPermission = (requestingUser, sourceUserId) => {
    if (requestingUser.role == 'admin')
        return;
    if (requestingUser.userId == sourceUserId.toString())
        return;
    throw new unauthorized_1.UnauthorizedError("You cant access that data!");
};
exports.checkPermission = checkPermission;
