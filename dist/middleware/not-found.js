"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFoundMiddleware = (req, res) => {
    return res.status(404).send("Route does not exist");
};
exports.default = notFoundMiddleware;
